import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificatonEmail(
    email: string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Ngl App | verification code',
            react: VerificationEmail({username, otp: verifyCode})
          });
        return {success: true, message: 'Verification email send successfully'}
    }catch (emailError){
        console.error("Error sending verification", emailError)
        return {success:false, message: 'Failed to send verification email'}
    }
}

