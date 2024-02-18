const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      unique: true,
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
export const File = mongoose.models.File || mongoose.model("File", fileSchema);
