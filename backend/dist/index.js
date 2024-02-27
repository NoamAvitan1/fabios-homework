"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { Prisma, PrismaClient } from '@prisma/client'
// import {MongoClient} from 'mongodb'
// import * as trpcExpress from '@trpc/server/adapters/express'
// import express from 'express'
// import cors from 'cors'
// import { appRouter } from './trpc'
const { Prisma, PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');
const trpcExpress = require('@trpc/server/adapters/express');
const express = require('express');
const cors = require('cors');
const appRouter = require('./trpc');
const PORT = 3000;
const uri = "mongodb+srv://Noam:Noam159753852@cluster0.1juvzwi.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0" || "";
const client = new MongoClient(uri);
const prisma = new PrismaClient();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    // createContext,
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1); // Exit the process if unable to connect to MongoDB
        }
    });
}
startServer();
// const server = app.listen(3000, () =>
//   console.log(`
// 🚀 Server ready at: http://localhost:3000
// ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
// )
