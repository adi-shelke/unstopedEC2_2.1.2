import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/database/dbUtils";
import { User } from "@/lib/database/models/User";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { name, password, repeatpassword, email } = await request.json();
    if (password !== repeatpassword) {
      return NextResponse.json(
        { message: "Wrong credentials", status: 401 },
        { status: 401 }
      );
    }
    // console.log(name, password);
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();

    return NextResponse.json(
      { status: 201, message: "new user created" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: 500, message: "Internal Serve error" },
      { status: 500 }
    );
  }
};
