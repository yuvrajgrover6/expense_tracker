import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import mergedResolver from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';
import * as dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import passport from 'passport';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { buildContext } from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

configurePassport()
await connectDB();

const MongoDbStore = ConnectMongoDBSession(session);
const store = new MongoDbStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
});

store.on("error", (error) => console.log(error));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        },
        store: store
    })
);


app.use(express.static(join(__dirname, '../frontend/dist')));
app.get("*", (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist', 'index.html'));
}
);

app.use(passport.initialize());
app.use(passport.session());






// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver
});

await server.start();





app.use('/',
    cors(
        {
            origin: "http://localhost:3000",
            credentials: true
        }

    ),
    express.json(),
    expressMiddleware(server,
        { context: async ({ req, res }) => buildContext({ req, res }) }
    ));


app.listen(4000, "localhost", () => "Your App is listening");
