import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "../../schema/auth.schema";

const Login = () => {
  const [email, setEmail] = useState("Raleigh.Feest86@yahoo.com");
  const [password, setPassword] = useState("123");
  //const [error,setError]=useState("")
  async function handelLogin(e) {
    e.preventDefault();
    const loginReqData = {
      email,
      password,
    };
    const { data } = LoginSchema.safeParse(loginReqData);
    //Login API Call
    const response = await loginUser(data);
    console.log("data", response);
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
