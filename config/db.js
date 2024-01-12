import mongoose from 'mongoose'
process.env.MONGO_URI="https://localhost:27017/db";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://jonathanj09876:DvDiyOrE7xxcwhrA@cluster0.k36nrq3.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
