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
  return token;
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { name, password, repeatpassword, email } = await request.json();
    if (password !== repeatpassword) {
      return NextResponse.json({
        message: "Wrong credentials",
        status: 404,
      });
    }
    // console.log(name, password);
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();
    const user = await User.findOne({ email });

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
    return NextResponse.json({
      message: "Internal Serve error",
      status: 500,
    });
  }
};
