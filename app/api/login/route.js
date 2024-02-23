import { NextResponse } from "next/server";
import { compare, compareSync } from "bcryptjs";
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

    const isPasswordCorrect = compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Wrong password", status: 401 },
        { status: 401 }
      );
    }
    console.log("going to work on signIn()");
    const info = await signIn("credentials", { email, password, id: user._id });
    console.log("info: ", info);

    // const token = await signToken(user._id);

    // const seralized = serialize("OutSiteJWT", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    //   path: "/",
    // });
    // user.password = null;

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
