import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database/dbUtils";
import { File } from "@/lib/database/models/File";
import { User } from "@/lib/database/models/User";
import { error } from "console";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PVT);

export const GET = async (request, { params }) => {
  const { fileid } = params;
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: 401, message: "unauthorized" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    await connectToDatabase();

    const user = await User.findById(userId);
    const file = await File.findById(fileid);
    // get the booked file
    // create the checkout session
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: file.title,
            images: [file.imageUrl],
          },

          unit_amount: file.price * 100,
        },
        quantity: 1,
      },
    ];

    // return NextResponse.json({
    //   status: "success",
    //   lineItems,
    // });
    // return NextResponse.json({ user, file });
    const address = {
      city: "Pune",
      country: "US",
      line1: "2420 D ward shukrwar peth",
      line2: "shaniwar peth 230",
      postal_code: "416002",
      state: "utha",
    };
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      address,
    });
    console.log(customer);
    const successUrl = new URL("http://localhost:3000/bookings/success");
    successUrl.searchParams.append("callbackUrl", "/bookings/field");
    successUrl.searchParams.append("userId", userId);
    successUrl.searchParams.append("fileId", fileid);
    const transactionSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: successUrl,
      cancel_url: "http://localhost:3000/",
      // get customer email
      //   customer_email: user.email,
      customer: customer.id,
      client_reference_id: fileid,
      line_items: lineItems,
      mode: "payment",
      currency: "inr",
    });
    // send it to client
    return NextResponse.json({
      status: 200,
      id: transactionSession.id,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
    console.log(err);
    console.log("Some error happend while creating your session");
  }
};
