import passport from "passport";
import UserModel from "../models/user.model";
import { GraphQLLocalStrategy } from "graphql-passport";
import { compare } from "bcryptjs";


export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing")
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = UserModel.findById(id);
            done(null, user)
        }
        catch (e) {
            done(e)
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = UserModel.findOne({ username });
                if (!user) {
                    throw new Error("Invalid Username or password")
                }
                const validPassword = await compare(password, user.password);

                if (!validPassword) {
                    throw new Error("Invalid Username or password")
                }

                done(null, user);
            }

            catch (err) {
                return done(err)
            }
        })
    )
};