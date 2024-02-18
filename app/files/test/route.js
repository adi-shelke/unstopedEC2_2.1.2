import { NextResponse } from "next/server";
const { jwtVerify } = require("jose-node-cjs-runtime");
const { createSecretKey } = require("crypto");
// thia is a dummy request delete it later
export const GET = async (request) => {
  try {
    const secretKey = createSecretKey(process.env.JWT_STRING, "utf-8");
    let token = request.headers.get("cookie").split(" ")[1];
    if (!token.startsWith("OutSiteJWT="));
    console.log(token);
    token = token.split("=")[1];
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      issuer: "urn:example:issuer", // issuer
      audience: "urn:example:audience", // audience
    });
    console.log(payload);
    return NextResponse.json({ S: "s" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ S: "s" });
  }
};
