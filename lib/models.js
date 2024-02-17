import mongoose from "mongoose";

const userSchmea = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      min: 5,
    },
    genres: [String],
    moods: [String],
    styles: [String],
    length: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchmea);
export const File = mongoose.models.File || mongoose.model("File", fileSchema);
