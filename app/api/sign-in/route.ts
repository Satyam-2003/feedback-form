import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 404 }
      );
    }

    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 403 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Signed in successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SIGN-IN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
