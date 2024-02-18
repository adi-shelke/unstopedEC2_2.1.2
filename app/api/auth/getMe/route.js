import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";
import { NextResponse } from "next/server";
const { jwtVerify } = require("jose-node-cjs-runtime");
const { createSecretKey } = require("crypto");
export const GET = async (request) => {
  try {
    //GETTING USER ID
    //   secrete key
    const secretKey = createSecretKey(process.env.JWT_STRING, "utf-8");

    let token = request?.headers?.get("cookie")?.split(" ")?.[1];
    if (!token) {
      return NextResponse.error("You need to log in");
    }

    token = token?.split("=")?.[1];
    if (!token) {
      return NextResponse.json({ status: 401, message: "Login to get access" });
    }
    const {
      payload: { id },
      protectedHeader,
    } = await jwtVerify(token, secretKey, {
      issuer: "urn:example:issuer", // issuer
      audience: "urn:example:audience", // audience
    });

    const userId = id;
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ status: 401, message: "Login to get access" });
    }
    user.password = null;
    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (err) {
    console.log(err);
    console.log("error in get me");
    return NextResponse.error("You need to log in ");
  }
};
