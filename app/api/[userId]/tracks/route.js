import { connectToDatabase } from "@/lib/database/dbUtils";
import { File } from "@/lib/database/models/File";
import { NextResponse } from "next/server";

export async function GET(request, { params: { userId } }) {
  try {
    // const { userId } = request.query;
    console.log("userId", userId);
    await connectToDatabase();
    const tracks = await File.find({ author: userId }).exec();
    // console.log(tracks);
    return NextResponse.json({ status: 200, tracks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, Message: "Internal Server Error" });
  }
}
