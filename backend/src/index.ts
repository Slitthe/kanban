import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { cleanup } from './db';
import { expressMiddleware } from '@apollo/server/express4';

import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
dotenv.config();

import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import resolvers from './graphql/resolvers';
import * as fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { AuthContext, TokenContent } from './types/auth';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, Math.random() * 2000);
});

app.use(json());

const schema = fs
    .readFileSync(path.resolve(__dirname, './graphql/schema.graphql'))
    .toString();

const typeDefs = gql(schema);

const serverOptions: ApolloServerOptions<AuthContext> = {
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
};
const server = new ApolloServer(serverOptions);

server.start().then(() => {
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }): Promise<AuthContext> => {
                const token = req.header('Authorization');
                if (!token) {
                    return {};
                }

                function getUserAsync(token: string) {
                    return new Promise((res, rej) => {
                        if (!process.env.JWT_SECRET) {
                            rej();
                            return;
                        }

                        jwt.verify(
                            token,
                            process.env.JWT_SECRET,
                            (err, user) => {
                                if (err) {
                                    console.log({ err });

                                    rej();
                                }
                                res(user);
                                return user;
                            }
                        );
                    });
                }

                try {
                    const user = (await getUserAsync(token)) as TokenContent;
                    return { user, isAuthenticated: true };
                } catch {
                    return { isAuthenticated: false };
                }
            },
        })
    );
});

app.listen(port, () => {
    console.log(`Express started on port: ${port}`);
});

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
