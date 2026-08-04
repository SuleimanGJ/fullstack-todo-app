import { useNavigate } from "react-router-dom"

function SignupForm() {
  const navigate = useNavigate()
  const handleLogin =() => {
    navigate('/login')
  }
  return (
    <div className="p-6 max-w-xl text-center bg-gray-400 rounded-2xl shadow-amber-300">
      <h1 className="text-2xl">Signup</h1>
      <form className=" py-6 flex flex-col text-left">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="my-3 rounded border-2 border-solid py-2"
          placeholder="Enter your username"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="my-3 rounded border-2 border-solid py-2"
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="my-3 rounded border-2 border-solid py-2"
          placeholder="Enter your password"
        />
        <button className="my-3 bg-green-700 py-2 px-1 rounded">Signup</button>
      </form>
      {/*  Login is a link */}
      <p>
        Already have an account? <span onClick={handleLogin}>Login</span>
      </p>
    </div>
  );
}

export default SignupForm