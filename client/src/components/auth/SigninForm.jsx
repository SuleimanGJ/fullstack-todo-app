import { useNavigate } from "react-router-dom";

function SigninForm() {
    const navigate = useNavigate();
    const handleRegister = () => {
      navigate("/register");
    };
  return (
    <div className="p-6 max-w-xl text-center bg-gray-400 rounded-2xl shadow-amber-300">
      <h1 className="text-2xl">Signin</h1>
      <form className=" py-6 flex flex-col text-left">
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
        <button className="my-3 bg-green-700 py-2 px-1 rounded">Signin</button>
      </form>
      {/*  register is a link */}
      <p>Don't have an account? <span onClick={handleRegister}>Register</span></p>
    </div>
  );
}

export default SigninForm;
