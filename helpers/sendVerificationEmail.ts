import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const response = await resend.emails.send({
      from: "Mystery Message <onboarding@resend.dev>",
      to: email,
      subject: "Your Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    if (!response || response.error) {
      throw new Error("Resend failed to send email");
    }

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    
    console.log("Error sending verificaion email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
