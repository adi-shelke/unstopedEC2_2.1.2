import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const { jwtVerify } = require("jose-node-cjs-runtime");
const { createSecretKey } = require("crypto");
const cookie = require("cookie");

import crypto from "crypto";
import { File } from "@/lib/database/models/File";
import { Schema } from "mongoose";
import { connectToDatabase } from "@/lib/database/dbUtils";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  // const file = (await request.formData()).get("file");
  const formData = await request.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const price = formData.get("price");
  const tags = formData.get("tags");
  const genre = formData.get("genre");
  const buffer = Buffer.from(await file.arrayBuffer());
  const hexFileName = crypto.randomBytes(32).toString("hex");
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

  // const userId = payload?.id || "";
  // console.log(userId);
  const putObjCmd = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: hexFileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(putObjCmd);
  const publicURL = (await getSignedUrl(s3, putObjCmd)).split("?")[0];
  console.log("publicURL: ", publicURL);
  // send the publicURL to metadata storage
  await connectToDatabase();
  
  const dbFile = new File({
    title: title,
    author: "65d24d6e89549b38d9051b06",
    genre: genre,
    price: price,
    url: publicURL,
    imageUrl: "thumbnail-url",
    rating: 5,
    tags: tags,
  });
  await dbFile.save();
  return NextResponse.json({ success: "the file is uploaded successfully" });
}
