import TransactionModel from "../models/transaction.model.js";
import UserModel from "../models/user.model.js";

const transactionResolver = {

    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User Unauthorized")
                }
                const userId = context.getUser()._id;
                const transactions = await TransactionModel.find({ userId });
                return transactions;

            }
            catch (e) {
                console.error("Error Getting Transactions", err);
                throw new Error("Error Getting Transactions")

            }
        },
        transaction: async (_, { transactionId }, context) => {
            try {
                const transaction = await TransactionModel.findById(transactionId);
                return transaction;
            }
            catch (err) {
                console.error("Error Getting Transaction", err);
                throw new Error("Error Getting Transaction")

            }
        },
        categoryStatistics: async (_, __, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("User Unauthorized")
                }
                const user = context.getUser();
                const transactions = await TransactionModel.find({ userId: user._id });
                const categoryMap = {};
                transactions.forEach(transaction => {
                    if (!categoryMap[transaction.category]) {
                        categoryMap[transaction.category] = 0;
                    }
                    categoryMap[transaction.category] += transaction.amount;

                });

                return Object.entries(categoryMap).map(([category, amount]) => {
                    return {
                        category,
                        amount
                    }
                }
                );
            }
            catch (err) {
                console.error("Error Getting Category Statistics", err);
                throw new Error("Error Getting Category Statistics")
            }
        }
    },
    Mutation: {

        createTransaction: async (parent, { input }, context) => {

            try {
                const transaction = await TransactionModel.create({
                    ...input,
                    userId: context.getUser()._id
                });
                return transaction;
            }
            catch (err) {
                console.error("Error Creating Transaction", err);
                throw new Error("Error Creating Transaction")
            }

        },
        updateTransaction: async (parent, { input }, context) => {

            try {
                console.log(input);
                const transaction = await TransactionModel.findByIdAndUpdate(input._id, input, { new: true });
                return transaction;
            }
            catch (err) {
                console.error("Error Updating Transaction", err);
                throw new Error("Error Updating Transaction")
            }

        },
        deleteTransaction: async (parent, { transactionId }, context) => {

            try {
                const transaction = await TransactionModel.findByIdAndDelete(transactionId);
                return transaction;
            }
            catch (err) {
                console.error("Error Deleting Transaction", err);
                throw new Error("Error Deleting Transaction")
            }
        }

    }
}


export default transactionResolver;