import { NextResponse } from "next/server";

export async function GET(request) {
    const data = await request.json();
    console.log(data);
      // ...
      return NextResponse.json({ message: 'GET request to /api/files/buy/:trackId'});
    
  }