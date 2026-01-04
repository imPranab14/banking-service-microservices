import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handelLogin(e) {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    console.log("Form Submit", loginData);
  }

  return (
    <>
      <form onSubmit={handelLogin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
