import UserModel from '../models/user.model.js';
import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;
const userResolver = {
    Query: {
        authUser: async (_, __, context) => {

            try {
                const user = context.getUser()
                return user;
            }
            catch (e) {
                console.error("Error aut user")
                throw new Error("User Not Found")
            }

        },
        user: async (_, { userId }) => {
            try {
                const user = await UserModel.findById(userId);
                return user;
            }
            catch (e) {
                console.error("Error fetching user")
                throw new Error("User Not Found")
            }

        }
    },
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input;
                if (!username || !name || !password || !gender) {

                    throw new Error("All Fields are required")
                }

                const userExist = await UserModel.findOne({ username });
                if (userExist) {
                    throw new Error("User Already Exists")
                }

                const salt = await genSalt(10);
                const hashedPass = await hash(password, salt);
                const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = await UserModel.create({
                    username,
                    name,
                    password: hashedPass,
                    gender,
                    profilePic: gender === "male" ? maleProfilePic : femaleProfilePic
                })


                await context.login(newUser);
                return newUser;



            }
            catch (e) {
                console.log(e)
                throw new Error(e.message)


            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                const { user } = await context.authenticate("graphql-local", { username, password })

                await context.login(user);
                return user;

            }
            catch (e) {
                console.log("Error in login")
                throw new Error("Invalid Credentials")
            }
        }
        ,
        logout: async (_, __, context) => {

            try {
                await context.logout();
                await context.req.session.destroy((err) => {
                    if (err) throw err;
                });
                context.res.clearCookie("connect.sid");
                return { message: "Logged Out Successfully" }

            }
            catch (e) {
                console.log("Error in logout")
                throw new Error("Error in logout")

            }

        }

    }
}


export default userResolver;