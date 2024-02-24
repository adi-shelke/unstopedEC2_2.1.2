import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";
import { signIn } from "@/auth";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { password, email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "No user found", status: 401 },
        { status: 401 }
      );
    }

    console.log("going to work on signIn()");
    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("signIn Response: ", signInResponse);

    return NextResponse.json({
      status: 200,
      message: "Authenicated",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500, message: err }, { status: 500 });
  }
};
