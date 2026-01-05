import React, { useState } from "react";
import { loginUser } from "../../api/auth.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handelLogin(e) {
    e.preventDefault();
    const loginData = {
      email:"Friedrich47@yahoo.com",
      password:"123",
    };
    const loginRes= await loginUser(loginData)
    console.log('loginRes',loginRes);
  }

  return (
    <>
    <div className="flex">
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
      </div>
    </>
  );
};

export default Login;
