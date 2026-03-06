import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");

  // FILTER STATES
  const [orderTypes, setOrderTypes] = useState([
    "Sherwani",
    "Party-wear",
    "Casual",
    "Formal",
    "Ethnic",
    "Indo-Western",
  ]);
  const [orderType, setOrderType] = useState("");
  const [newOrderType, setNewOrderType] = useState("");
  const [showNewOrderTypeInput, setShowNewOrderTypeInput] = useState(false);

  // SORT STATE
  const [sortType, setSortType] = useState("");

  // FETCH ALL
  const fetchProducts = async () => {
    const res = await axios.get("https://ethnic-production-manager.onrender.com/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchId === "") {
      fetchProducts();
    }
  }, [searchId]);

  // SEARCH
  const handleSearch = async () => {
    if (!searchId.trim()) {
      fetchProducts();
      return;
    }

    try {
      const res = await axios.get(
        `https://ethnic-production-manager.onrender.com/products/search/custid/${searchId}`
      );
      setProducts([res.data]);
    } catch {
      toast.error("Customer ID not found ❌");
    }
  };

  // FILTER
  const handleFilterChange = async (value) => {
    if (value === "ADD_NEW") {
      setShowNewOrderTypeInput(true);
      return;
    }

    setShowNewOrderTypeInput(false);
    setOrderType(value);

    if (value === "") {
      fetchProducts();
      return;
    }

    const res = await axios.get(
      `https://ethnic-production-manager.onrender.com/products/filter/order?type=${value}`
    );
    setProducts(res.data);
  };

  const addNewOrderType = async () => {
    if (!newOrderType.trim()) return;

    setOrderTypes([...orderTypes, newOrderType]);
    setOrderType(newOrderType);
    setShowNewOrderTypeInput(false);

    const res = await axios.get(
      `https://ethnic-production-manager.onrender.com/products/filter/order?type=${newOrderType}`
    );
    setProducts(res.data);

    setNewOrderType("");
  };

  // SORT
  const handleSort = async (value) => {
    setSortType(value);

    if (value === "") {
      fetchProducts();
      return;
    }

    const res = await axios.get(
      "https://ethnic-production-manager.onrender.com/products/sort/noofpiece"
    );
    setProducts(res.data);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ethnic-production-manager.onrender.com/products/${id}`);
      toast.success("Order deleted successfully 🗑️");
      fetchProducts();
    } catch {
      toast.error("Failed to delete order ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Customer ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-300 p-2 pr-8 rounded-md w-64"
          />

          {searchId && (
            <button
              onClick={() => setSearchId("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>

        <select
          value={orderType}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">All Orders</option>
          {orderTypes.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
          <option value="ADD_NEW">➕ Add New...</option>
        </select>

        {showNewOrderTypeInput && (
          <div className="flex gap-2">
            <input
              value={newOrderType}
              onChange={(e) => setNewOrderType(e.target.value)}
              placeholder="New order type"
              className="border border-gray-300 p-2 rounded-md"
            />
            <button
              onClick={addNewOrderType}
              className="bg-green-600 text-white px-3 rounded-md"
            >
              Add
            </button>
          </div>
        )}

        <select
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">No Sorting</option>
          <option value="asc">Sort by Pieces</option>
        </select>

        <div className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm">
          <span className="text-gray-700 font-medium">Total Orders:</span>
          <span className="ml-2 text-blue-600 font-bold">{products.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 text-white rounded-xl p-5 shadow-md relative"
          >
            <span className="absolute top-3 right-3 bg-pink-600 text-xs px-3 py-1 rounded-full">
              {p.order_type}
            </span>

            <p className="text-sm text-gray-400">{p.customer_id}</p>
            <h2 className="text-lg font-semibold">{p.cust_name}</h2>

            <div className="mt-3 text-sm text-gray-300 space-y-1">
              <p>🧵 Pieces: <span className="text-white">{p.no_of_piece}</span></p>
              <p>💰 Cost per piece: ₹ {p.cost}</p>
              <p className="text-green-400 font-semibold">
                Total: ₹ {p.cost * p.no_of_piece}
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Created: {new Date(p.createdAt).toDateString()}
            </p>

            <div className="flex gap-3 mt-4">
              <Link to={`/view/${p._id}`} className="bg-blue-600 px-3 py-1 rounded text-sm">
                View
              </Link>
              <Link to={`/edit/${p._id}`} className="bg-yellow-500 text-black px-3 py-1 rounded text-sm">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
