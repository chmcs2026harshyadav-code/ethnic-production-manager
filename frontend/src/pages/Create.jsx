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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      navigate("/");
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
        <input name="order_type" placeholder="Order Type" onChange={handleChange} className="border p-2 w-full"/>
        <input name="material" placeholder="Material" onChange={handleChange} className="border p-2 w-full"/>
        <input name="color" placeholder="Color" onChange={handleChange} className="border p-2 w-full"/>
        <input name="no_of_piece" type="number" placeholder="No of Pieces" onChange={handleChange} className="border p-2 w-full"/>
        <input name="cost" type="number" placeholder="Cost" onChange={handleChange} className="border p-2 w-full"/>
        <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full"/>

        <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded">
          Save Order
        </button>

      </form>
    </div>
  );
}

export default Create;
