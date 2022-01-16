// src/app.ts
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
  } from "express";
import { Error400,Error401, Error409, Error500, Error404 } from "./error";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
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
    if (err instanceof Error400 || err instanceof Error401 || err instanceof Error404 || err instanceof Error409 || err instanceof Error500) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    next();
  });