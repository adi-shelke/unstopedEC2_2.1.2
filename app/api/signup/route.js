import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/User";
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";
const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { name, password, repeatpassword, email } = await request.json();
    if (password !== repeatpassword) {
      throw Error("password dont match");
    }
    console.log(name, password);
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();
    const user = await User.findOne({ email });

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
