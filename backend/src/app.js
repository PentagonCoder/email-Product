import express from "express";
import cors from "cors"
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));


import { notFound } from './middlewares/notFound.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'

app.use(notFound);
app.use(errorHandler);

export {app};