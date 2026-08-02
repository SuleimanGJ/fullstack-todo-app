import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1>TodoAPP</h1>
      </div>
      <nav>
        <ul className="flex bg-red-500 space-x-4">
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
