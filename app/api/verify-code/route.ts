import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        { status: 500 }
      );
    } else if (!isCodeExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign-up again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid code",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error while verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error while verifying user",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
