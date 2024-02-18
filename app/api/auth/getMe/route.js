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
    let token = cookies?.["OutSiteJWT"];
    console.log(token);

    if (!token) {
      return NextResponse.json({
        status: "fail",
        message: "You need to log in",
      });
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
      return NextResponse.json({
        status: "fail",
        message: "You need to log in",
      });
    }
    user.password = null;
    return NextResponse.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
    console.log("error in get me");
    return NextResponse.json({
      status: "fail",
      message: "You need to log in",
    });
  }
};
