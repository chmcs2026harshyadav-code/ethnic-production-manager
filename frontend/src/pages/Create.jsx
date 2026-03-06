import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id: "",
    cust_name: "",
    cust_phone_no: "",
    order_type: "",
    no_of_piece: "",
    cost: "",
    material: "",
    color: "",
    address: "",
  });

  // Order Types
  const [orderTypes, setOrderTypes] = useState([
    "Party-Wear",
    "Casual",
    "Formal",
    "Ethnic",
    "Indo-Western",
  ]);
  const [newOrderType, setNewOrderType] = useState("");
  const [showOrderTypeInput, setShowOrderTypeInput] = useState(false);

  // Materials
  const [materials, setMaterials] = useState([
    "Banarasi Silk",
    "Chinese Silk",
  ]);
  const [newMaterial, setNewMaterial] = useState("");
  const [showMaterialInput, setShowMaterialInput] = useState(false);

  // Colors
  const [colors, setColors] = useState([
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Pink",
    "Purple",
    "Orange",
    "Brown",
    "Grey",
    "Maroon",
  ]);
  const [newColor, setNewColor] = useState("");
  const [showColorInput, setShowColorInput] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Order Type
  const handleOrderTypeChange = (e) => {
    if (e.target.value === "ADD_NEW") {
      setShowOrderTypeInput(true);
      setFormData({ ...formData, order_type: "" });
    } else {
      setShowOrderTypeInput(false);
      setFormData({ ...formData, order_type: e.target.value });
    }
  };

  const addNewOrderType = () => {
    if (!newOrderType.trim()) return;
    setOrderTypes([...orderTypes, newOrderType]);
    setFormData({ ...formData, order_type: newOrderType });
    setNewOrderType("");
    setShowOrderTypeInput(false);
  };

  // Material
  const handleMaterialChange = (e) => {
    if (e.target.value === "ADD_NEW") {
      setShowMaterialInput(true);
      setFormData({ ...formData, material: "" });
    } else {
      setShowMaterialInput(false);
      setFormData({ ...formData, material: e.target.value });
    }
  };

  const addNewMaterial = () => {
    if (!newMaterial.trim()) return;
    setMaterials([...materials, newMaterial]);
    setFormData({ ...formData, material: newMaterial });
    setNewMaterial("");
    setShowMaterialInput(false);
  };

  // Color
  const handleColorChange = (e) => {
    if (e.target.value === "ADD_NEW") {
      setShowColorInput(true);
      setFormData({ ...formData, color: "" });
    } else {
      setShowColorInput(false);
      setFormData({ ...formData, color: e.target.value });
    }
  };

  const addNewColor = () => {
    if (!newColor.trim()) return;
    setColors([...colors, newColor]);
    setFormData({ ...formData, color: newColor });
    setNewColor("");
    setShowColorInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all fields ❗");
        return;
      }
    }

    try {
      await axios.post("/products", {
        ...formData,
        no_of_piece: Number(formData.no_of_piece),
        cost: Number(formData.cost),
      });

      toast.success("Order added successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch {
      toast.error("Failed to add order ❌");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Order</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="customer_id" placeholder="Customer ID" onChange={handleChange} className="border p-2 w-full"/>
        <input name="cust_name" placeholder="Customer Name" onChange={handleChange} className="border p-2 w-full"/>
        <input name="cust_phone_no" placeholder="Phone Number" onChange={handleChange} className="border p-2 w-full"/>

        {/* Order Type */}
        <select onChange={handleOrderTypeChange} className="border p-2 w-full">
          <option value="">Select Order Type</option>
          {orderTypes.map((o, i) => (
            <option key={i} value={o}>{o}</option>
          ))}
          <option value="ADD_NEW">➕ Add New...</option>
        </select>

        {showOrderTypeInput && (
          <div className="flex gap-2">
            <input value={newOrderType} onChange={(e)=>setNewOrderType(e.target.value)} className="border p-2 flex-1" placeholder="New order type"/>
            <button type="button" onClick={addNewOrderType} className="bg-green-600 text-white px-4">Add</button>
          </div>
        )}

        {/* Material */}
        <select onChange={handleMaterialChange} className="border p-2 w-full">
          <option value="">Select Material</option>
          {materials.map((m,i)=>(
            <option key={i} value={m}>{m}</option>
          ))}
          <option value="ADD_NEW">➕ Add New...</option>
        </select>

        {showMaterialInput && (
          <div className="flex gap-2">
            <input value={newMaterial} onChange={(e)=>setNewMaterial(e.target.value)} className="border p-2 flex-1" placeholder="New material"/>
            <button type="button" onClick={addNewMaterial} className="bg-green-600 text-white px-4">Add</button>
          </div>
        )}

        {/* Color */}
        <select onChange={handleColorChange} className="border p-2 w-full">
          <option value="">Select Color</option>
          {colors.map((c,i)=>(
            <option key={i} value={c}>{c}</option>
          ))}
          <option value="ADD_NEW">➕ Add New...</option>
        </select>

        {showColorInput && (
          <div className="flex gap-2">
            <input value={newColor} onChange={(e)=>setNewColor(e.target.value)} className="border p-2 flex-1" placeholder="New color"/>
            <button type="button" onClick={addNewColor} className="bg-green-600 text-white px-4">Add</button>
          </div>
        )}

        <input name="no_of_piece" type="number" placeholder="No of Pieces" onChange={handleChange} className="border p-2 w-full"/>
        <input name="cost" type="number" placeholder="Cost" onChange={handleChange} className="border p-2 w-full"/>
        <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full"/>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded">
            Save Order
          </button>

          <button type="button" onClick={()=>navigate("/")} className="bg-gray-500 text-white py-2 w-full rounded">
            Back
          </button>
        </div>

      </form>
    </div>
  );
}

export default Create;
