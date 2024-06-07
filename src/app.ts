/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

const app: Application = express();

// CORS
app.use(cors());
app.use(cookieParser());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Server routes
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: `AS 8 Pet Adoption POSTGRES Server is running..!`,
  });
});

// App routes
app.use("/api", router);

// Global Error Handler
app.use(globalErrorHandler);

// NOT Found API route response
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
