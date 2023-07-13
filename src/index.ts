import "reflect-metadata";
import { DataSource } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import http from "http";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { LyricsResolver } from "./resolvers/lyrics";
import { Lyrics } from "./entities/lyrics";

dotenv.config();
const PORT = 8000;
const corsOrigin = "https://pettaboy.github.io"
async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [LyricsResolver],
        validate: { forbidUnknownValues: false }
    });
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });
    await server.start();
    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: corsOrigin,
            credentials: true
        }),
        json(),
        expressMiddleware(server, { context: async ({ req, res }) => ({ req, res })})
    );
    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
}


const ServerDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URL,
    entities: [Lyrics],
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: true,
    ssl: true
});

ServerDataSource.initialize().then(() => {
    console.log("Database connected");
    bootstrap();
}).catch((err) => {
    console.log(err);
});