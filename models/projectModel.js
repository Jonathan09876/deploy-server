import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project Name is a required field"],
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    details: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
