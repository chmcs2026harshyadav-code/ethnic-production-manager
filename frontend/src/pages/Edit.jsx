import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get(`/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`/${id}`, form);
    toast.success("Order updated successfully ✏️");
    navigate("/");
  } catch {
    toast.error("Update failed ❌");
  }
};

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Order</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {Object.keys(form).map(
          (key) =>
            !["_id", "__v", "createdAt", "updatedAt"].includes(key) && (
              <input
                key={key}
                name={key}
                value={form[key] || ""}
                onChange={handleChange}
                className="input input-bordered"
              />
            )
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn btn-warning">
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;