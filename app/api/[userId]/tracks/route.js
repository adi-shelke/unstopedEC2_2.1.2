import { connectToDatabase } from "@/lib/database/dbUtils";
import { File } from "@/lib/database/models/File";
import { NextResponse } from "next/server";

export async function GET(request, { params: { userId } }) {
  try {
    console.log("userId", userId);
    if (userId.length() !== 24) {
      return NextResponse.json(
        { status: 403, message: "Invalid user-id" },
        { status: 403 }
      );
    }
    await connectToDatabase();
    const tracks = await File.find({ author: userId }).exec();
    // console.log(tracks);
    return NextResponse.json({ status: 200, tracks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, Message: "Internal Server Error" });
  }
}
