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
    rating: {
      type: Number,
    },
    tags: {
      type: string,
    },
  },
  { timestamps: true }
);
export const File = mongoose.models.File || mongoose.model("File", fileSchema);
