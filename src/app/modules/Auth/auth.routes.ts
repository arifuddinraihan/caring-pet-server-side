import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../User/user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.createUser),
  AuthController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidation),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
