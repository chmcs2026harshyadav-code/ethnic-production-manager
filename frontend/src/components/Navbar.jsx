import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-warning shadow-lg px-10 py-6">
      {/* LEFT */}
      <div className="flex-1 flex items-center gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/128/11183/11183378.png"
          alt="Logo"
          className="w-12 h-12"
        />

       <span
  className="text-4xl font-bold text-black-900 tracking-wide"
  style={{ fontFamily: "'Pacifico', cursive" }}
>
  Ethnic Production Manager
</span>
      </div>

      {/* RIGHT */}
      <div className="flex-none">
        <Link to="/create" className="btn btn-error btn-lg">
          + Add Order
        </Link>
      </div>
    </div>
  );
};

export default Navbar;