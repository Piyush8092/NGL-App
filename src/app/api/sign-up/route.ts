import dbConnect from "@/lib/dbConnect";
import UseModel from "@/model/user";
import bcrypt from "bcryptjs"

import { sendVerificatonEmail } from "@/helpers/sendVerificatonEmail";
import UserModel from "@/model/user";

export async function POST(request: Request) {
    await dbConnect()
    
    try{
        const {username, email, password } = await request.json()
       const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
       })

       if (existingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username already exist "
        }, {status: 400})
       }

       const exitisingUserByEmail = await UserModel.findOne({email})
       
       
       const verifyCode = Math.floor(1000 + Math.random()* 900000).toString()
       


       if (exitisingUserByEmail){
            if(exitisingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already exits with this Email"
                }, {status: 500})
            } else{
                const hasedPassword = await bcrypt.hash(password, 10)
                exitisingUserByEmail.password = hasedPassword;
                exitisingUserByEmail.verifyCode = verifyCode;
                exitisingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await exitisingUserByEmail.save()
            }
       }else{
            const hasedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

           const newUser=  new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
       }

       //Send Verification Email
        const emailResponse = await sendVerificatonEmail(
            email,
            username,
            verifyCode
       )

       if (!emailResponse.success){
        return Response.json({
            success: false,
            message: emailResponse.message
        }, {status: 500})
       }

       return Response.json({
            success: true,
            message: "User registered Successfully Please Verify Email"
       }, {status:201})

           } catch (error) {
        console.error('Error regestring user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
        

    }
}