import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Follow-up List</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/add-new" className="hover:text-gray-300">
          Add New
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
