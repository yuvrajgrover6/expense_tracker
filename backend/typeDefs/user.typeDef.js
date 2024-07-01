const userTypeDef = `#graphql 
type User {
    _id:ID!
    username:String!
    name:String!
    password:String!
    profilePic : String
    gender:String

}
    type Query {
        users : [User!]
        authUser : User
        user(_id:ID!) : User
    }

    type Mutation {
        signup(input:SignupInput!) : User
        login(input:LoginInput!) : User
        logout:LogoutResponse
    }

    input SignupInput {
        username:String!
        name:String!
        password:String!
        gender:String!
        
    }

    input LoginInput{
        username:String!
        password:String!
    }


    type LogoutResponse{
        message : String!
    }
`;


export default userTypeDef;