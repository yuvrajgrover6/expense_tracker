import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['card', 'cash'],
        required: true
    },
    category: {
        type: String,
        enum: ['investment', 'saving', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: "Unknown"
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true }
);


const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;