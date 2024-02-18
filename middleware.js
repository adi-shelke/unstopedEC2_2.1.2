import { NextResponse } from "next/server";
import { verify } from "./lib/auth/utils";
// import { verify } from "./lib/auth/utils";

export const middleware = async (request) => {
  const isOnProfilePage = request.nextUrl.pathname?.startsWith("/profile");
  if (isOnProfilePage) {
    // console.log(request);
    let token = request.headers.get("cookie");
    if (!token.startsWith("OutSiteJWT="));
    token = token.split("=")[1];
    if (!token) {
      return next("You are not logged in! Please log in to get access.");
    }
    // console.log(token);
    const id = await verify(token);
  }

  return NextResponse.json({ s: "s" });
};
