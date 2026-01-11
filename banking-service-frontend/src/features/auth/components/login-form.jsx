import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginApi } from "../api/auth.api";
import { LoginSchema } from "../schema/auth.schema";

const LoginFrom = () => {
  const [email, setEmail] = useState("Raleigh.Feest86@yahoo.com");
  const [password, setPassword] = useState("123");
  //const [error,setError]=useState("")
  async function handelLogin(e) {
    e.preventDefault();
    const loginReqData = {
      email,
      password,
    };
    //Zod Schema Validation
    const { data } = LoginSchema.safeParse(loginReqData);
    //Login API Call
    const response = await loginApi(data);
    console.log("data", response);
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
