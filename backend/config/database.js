import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_DEV,{dbName:"Ecommerce"
    })
    .then((data) => {
      console.log(`Database connected with server ${data.connection.host}`);
    })
};

export default connectDatabase;