import { users } from '../dummy_data/data.js'

const userResolver = {
    Query: {
        users: () => {
            return users;
        }
    },
    Mutation: {}
}


export default userResolver;