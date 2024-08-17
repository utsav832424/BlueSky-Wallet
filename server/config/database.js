import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/BlueSky_Wallet`)
    .then((data) => {
      console.log(`Mongo Connected at ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
