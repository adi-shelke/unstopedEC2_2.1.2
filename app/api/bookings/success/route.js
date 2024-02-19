import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  const userId = request.nextUrl.searchParams.get("userId");
  const fileId = request.nextUrl.searchParams.get("fileId");

  if (callbackUrl !== "/bookings/field") {
    return NextResponse.json(
      { status: 400, message: "not a success callback" },
      { status: 400 }
    );
  }
  await connectToDatabase();
  const user = await User.findById(userId).exec();
  user.paidTracks = [...(user.paidTracks || []), fileId];
  await user.save();
  console.log(await User.findById(userId).exec());
  return NextResponse.json(
    { status: 201, message: "added new track to paid tracks" },
    { status: 201 }
  );
}
