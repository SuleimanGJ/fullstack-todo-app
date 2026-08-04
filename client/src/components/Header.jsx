import {Link } from "react-router-dom"

const Header = () => {
    return (
      <header className="bg-green-400 flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">
            <Link to="/">TodoAPP</Link>
          </h1>
        <ul className="flex bg-red-500 space-x-4">
          <li>
            <Link to="/">Home</Link>
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
      </header>
    );
}

export default Header;