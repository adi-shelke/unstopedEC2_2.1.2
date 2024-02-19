import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";
import { NextResponse } from "next/server";
const { jwtVerify } = require("jose-node-cjs-runtime");
const { createSecretKey } = require("crypto");
const cookie = require("cookie");

export const GET = async (request) => {
  try {
    //GETTING USER ID
    //   secrete key
    const secretKey = createSecretKey(process.env.JWT_STRING, "utf-8");
    const cookies = cookie.parse(request?.headers?.get("cookie"));
    //console.log(cookies);
    let token = cookies?.["OutSiteJWT"];
    // console.log(token);
    if (!token) {
      console.log("No token in cookie");
      return NextResponse.json({
        status: 401,
        message: "You need to log in",
      });
    }

    // token = token?.split("=")?.[1];
    // if (!token) {
    //   console.log("No token");
    //   return NextResponse.json({ status: 401, message: "Login to get access" });
    // }
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
      console.log("No user");
      return NextResponse.json({ status: 401, message: "Login to get access" });
    }
    user.password = null;
    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 401,
      message: "Unauthorized access",
    });
  }
};
