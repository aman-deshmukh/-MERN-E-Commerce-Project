import React, { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log({
      email,
      password,
    });

    // We'll connect this to the backend in the next step
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">

      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Panel
        </h1>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Email</p>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Password</p>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
          type="submit"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;