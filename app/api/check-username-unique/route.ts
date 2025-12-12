import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export const runtime = "nodejs"; // ensure Node runtime so mongoose/native libs work

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username") ?? undefined,
    };

    // validation with zod
    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      // return structured validation errors
      const errors = result.error.format();
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters",
          errors,
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      // username already taken
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // username available
    return NextResponse.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while checking username",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
