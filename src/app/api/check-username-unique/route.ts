import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";


const usernameQuerrySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()

    try{
        const {searchParams} = new URL(request.url)

    }catch (error) {
        console.error("Error checking Username" , error)
        return Response.json(
            {
                success: false,
                message: "Error checking  username "
            },
            {status : 500}
        )
    }
    
}