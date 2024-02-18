import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";

import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/User";
const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { password, email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("No user find with this email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw Error("password do not match");
    }

    const token = signToken(user._id);

    const seralized = serialize("OutSiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      path: "/",
    });
    user.password = null;
    const response = {
      message: "Authenicated",
      data: user,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
