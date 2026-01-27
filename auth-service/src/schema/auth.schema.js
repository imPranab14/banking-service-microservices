import z from "zod";

const LoginSchema = z.object({
  email: z.email("Invalid email format").lowercase(),
  password: z.string(),
});

const RegisterSchema = z.object({
  name: z.string(),
  email: z.email("Invalid email format"),
  password: z.string(),
});

export { LoginSchema,RegisterSchema };
