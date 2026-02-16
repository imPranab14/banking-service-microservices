import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "../schema/auth.schema";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginFrom = () => {
  const [email, setEmail] = useState("marco.shanahan@hotmail.com");
  const [password, setPassword] = useState("123");
  const navigate = useNavigate();


  //Zustand Store Call
  const { error,fetchLogin } = useAuthStore();
  //Handel Login From
  async function handelLogin(e) {
    e.preventDefault();
    //Request Login Data
    const loginReqData = {
      email,
      password,
    };
    //Zod Schema Validation
    const { data } = LoginSchema.safeParse(loginReqData);
    //Login API Call
    await fetchLogin(data);
    navigate("/home");
  }

  return (
    <>
      <form onSubmit={handelLogin}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              //required
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
            <Button variant="outline" type="button">
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
      
    </>
  );
};

export default LoginFrom;
