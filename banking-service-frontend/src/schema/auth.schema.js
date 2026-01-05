import z from "zod"

const LoginSchema=z.object({
    email:z.email(),
    password:z.string().min(6)
})

export  {LoginSchema};