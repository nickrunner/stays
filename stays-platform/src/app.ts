// src/app.ts
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request as ExRequest, Response as ExResponse } from "express";

import { RegisterRoutes } from "../build/routes";
import { Error400, Error401, Error404, Error409, Error500 } from "./error";

export const app = express();

// app.use((__, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// })
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Content-Type", "application/json");
  next();
});

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (
    err instanceof Error400 ||
    err instanceof Error401 ||
    err instanceof Error404 ||
    err instanceof Error409 ||
    err instanceof Error500
  ) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }
  next();
});

const corsOptions: cors.CorsOptions = {
  preflightContinue: true
};
app.use(cors(corsOptions));
