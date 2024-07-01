import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db");
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }

}


export default connectDB;