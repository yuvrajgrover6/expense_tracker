import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
},

    { timestamps: true }
);


const UserModel = mongoose.model("User", userSchema);

export default UserModel;