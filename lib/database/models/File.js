const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    tags: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);
export const File = mongoose.models.File || mongoose.model("File", fileSchema);
