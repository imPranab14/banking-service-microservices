import z from "zod";

const LoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string(),
});

export { LoginSchema };
