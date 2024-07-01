import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import mergedResolver from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';
import * as dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
const app = express();

dotenv.config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver
});

await server.start();
await connectDB();
app.use('/', cors(), express.json(), expressMiddleware(server));


app.listen(4000, "localhost", () => "Your App is listening");
