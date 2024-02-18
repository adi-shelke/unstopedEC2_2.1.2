import { connectToDatabase } from "@/lib/database/dbUtils";
import { File } from "@/lib/database/models/File";
import { User } from "@/lib/database/models/User";
import { NextResponse } from "next/server";

const { jwtVerify } = require("jose-node-cjs-runtime");
const { createSecretKey } = require("crypto");
const cookie = require("cookie");

const stripe = require("stripe")(process.env.STRIPE_PVT);

export const GET = async (request, { params }) => {
  const { fileid } = params;
  try {
    //GETTING USER ID
    //   secrete key
    const secretKey = createSecretKey(process.env.JWT_STRING, "utf-8");
    const cookies = cookie.parse(request?.headers?.get("cookie"));
    let token = cookies?.["OutSiteJWT"];
    console.log(token);

    if (!token) {
      return NextResponse.json({
        status: "fail",
        message: "You need to log in",
      });
    }

    const {
      payload: { id },
      protectedHeader,
    } = await jwtVerify(token, secretKey, {
      issuer: "urn:example:issuer", // issuer
      audience: "urn:example:audience", // audience
    });

    const userId = id;
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      // get customer email
      //   customer_email: user.email,
      customer: customer.id,
      client_reference_id: fileid,
      line_items: lineItems,
      mode: "payment",
      currency: "inr",
    });
    console.log(session);
    // send it to client
    return NextResponse.json({
      status: "success",
      id: session.id,
    });
  } catch (err) {
    console.log(err);
    console.log("Some error happend while creating your session");
  }
};
