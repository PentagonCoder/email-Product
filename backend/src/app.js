import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
]

app.use(cors({
  origin: allowedOrigins,
  // origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import { notFound } from './middlewares/notFound.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'

import userRoutes from './routes/user.routes.js'
import buyerRoutes from './routes/buyer.routes.js'


app.use('/api/users', userRoutes);
app.use('/api/buyers', buyerRoutes);

app.use(notFound);
app.use(errorHandler);

export {app};