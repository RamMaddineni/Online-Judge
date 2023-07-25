import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const DBConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI2}`, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
};
