import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://tejasviraj8686:0cBGSXkvpptmNVEl@cluster0.ibzwyqw.mongodb.net/";

    mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog database connection is successfull"))
    .catch((error) => console.log(error));
};

export default connectToDB;