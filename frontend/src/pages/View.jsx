import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `http://localhost:3000/products/${id}`
      );
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Order Details
      </h2>

      <div className="border p-4 rounded space-y-2">
        <p><b>Customer ID:</b> {product.customer_id}</p>
        <p><b>Customer Name:</b> {product.cust_name}</p>
        <p><b>Phone No:</b> {product.cust_phone_no}</p>
        <p><b>Order Type:</b> {product.order_type}</p>
        <p><b>No of Pieces:</b> {product.no_of_piece}</p>
        <p><b>Cost:</b> {product.cost}</p>
        <p><b>Material:</b> {product.material}</p>
        <p><b>Color:</b> {product.color}</p>
        <p><b>Address:</b> {product.address}</p>

        <hr />

        <p>
          <b>Created At:</b>{" "}
          {new Date(product.createdAt).toLocaleString()}
        </p>
        <p>
          <b>Last Updated:</b>{" "}
          {new Date(product.updatedAt).toLocaleString()}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🖨 Print
        </button>

        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default View;