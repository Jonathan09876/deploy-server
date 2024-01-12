import mongoose from "mongoose";

const companysSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "file Name is a required field"],
    },
    detail1: {
      type: String,
      required: false,
    },
    detail2: {
      type: String,
      required: false,
      default: false,
    },
    president: {
      type: String,
      required: false,
      default: false,
    },
    postcode:
    {
      type:String,
      required:false,
      default:false,
    },
    address:
    {
        type:String,
        required:false,
    },
    hubs:
    {
      type:String,
      required:false,
      default:false,
    },
    lat:
    {
      type:Number,
      require:false
    },
    long:
    {
      type:Number,
      require:false,
    },
    color:
    {
      type:String,
      requir:false,
    },
    roundColor:
    {
      type:String,
      require:false,
    },
    motherColor:
    {
      type:String,
      require:false,
    },
    show:
    {
      type:Boolean,
      require:false,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companysSchema);

export default Company;
