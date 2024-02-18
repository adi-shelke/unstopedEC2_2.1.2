import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const trackId = data.trackId;
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ success: "the file is uploaded successfully" });
}
