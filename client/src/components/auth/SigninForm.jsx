

function SigninForm() {
  return (
    <div className=" p-6 max-w-full text-center bg-gray-400 shadow-amber-300">
      <h1>Signin</h1>
      <form className=" py-6 flex flex-col text-left">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button>Signin</button>
      </form>
      {/*  register is a link */}
      <p>Don't have an account? Register</p>
    </div>
  );
}

export default SigninForm