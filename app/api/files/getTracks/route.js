import { File } from "@/lib/database/models/File";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const userId = data.userId;
    console.log("userId", userId)
    const tracks = await File.find({ author: userId });
    // console.log(tracks);
    return NextResponse.json({status: 200, tracks});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, Message: "Internal Server Error" });
  }
}
