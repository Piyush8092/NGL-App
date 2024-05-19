import{z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"Username must be at least 2 characters")
    .max(20, "Username must be not more than 20 character")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special charcter")



export const signuUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email Address'}),
    password: z.string().min(6, {message: "Password must be at least 6 character"}),
})
