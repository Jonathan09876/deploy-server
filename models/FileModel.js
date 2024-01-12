import mongoose from "mongoose";

const filesShema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "file Name is a required field"],
    },
    UploadDate: {
      type: String,
      required: false,
    },
    Status: {
      type: Number,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", filesShema);

export default File;
