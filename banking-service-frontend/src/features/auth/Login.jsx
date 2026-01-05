import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("Friedrich47@yahoo.com");
  const [password, setPassword] = useState("123");
  async function handelLogin(e) {
    e.preventDefault();
    const loginData = {
      email,
      password 
    };
    console.log("loginData",loginData);
    const loginRes = await loginUser(loginData);
    console.log("loginRes", loginRes);
  }

  return (
    <>
      <div className="flex">
        <form onSubmit={handelLogin}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Login;
