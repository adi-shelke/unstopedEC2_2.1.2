import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

const { createSecretKey } = require("crypto");
const { SignJWT } = require("jose-node-cjs-runtime");

import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";

const signToken = async function (id) {
  const secretKey = createSecretKey(process.env.JWT_STRING, "utf-8");

  const token = await new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secretKey);
  console.log(token);
  return token;
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { password, email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "No user find with this email",
        status: 404,
      });
      // throw Error("No user find with this email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Wrong Credentials",
        status: 401,
      });
    }

    const token = await signToken(user._id);

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
