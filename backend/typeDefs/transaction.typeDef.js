const transactionTypeDef = `#graphql
type Transaction {
    _id : ID!
    userId : ID!
    description : String!
    paymentType: String!
    category : String!
    amount : Float!
    location : String
    date: String!
    user:User!
}


type Query {

    transactions : [Transaction!]
    transaction (transactionId:ID!):Transaction
    categoryStatistics : [CategoryStatistics!]
}

type Mutation {
    createTransaction(input:CreateTransactionInput):Transaction!
    updateTransaction(input:UpdateTransactionInput):Transaction!
    deleteTransaction(transactionId:ID!):Transaction!
}

type CategoryStatistics {
    category : String!
    amount : Float!
}



input CreateTransactionInput{
    description : String!
    paymentType: String!
    category : String!
    amount : Float!
    location : String
    date: String! 
}
input UpdateTransactionInput{
    _id:ID!
    description : String
    paymentType: String
    category : String
    amount : Float
    location : String
    date: String
}
`;

export default transactionTypeDef;