/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
    await dbConnect()

    try {
       const {username, email, password} = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    })

    if(existingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username is already taken",
        },{status:400})
    }
    } catch (error) {
        console.error(error, {message: "Error while registering user"});
        return Response.json({
            success: false,
            message: "Error registering user"
        },
    {
        status: 500
    })
    }
}