import { users } from '../dummy_data/data.js'

const userResolver = {
    Query: {
        users: (parent, args, context, info) => {
            return users;
        },
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    Mutation: {}
}


export default userResolver;