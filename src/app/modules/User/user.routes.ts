import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/", auth(), UserController.getUserProfile);

router.put(
  "/",
  auth(),
  validateRequest(UserValidation.updateUser),
  UserController.updateCurrentUserProfile
);

export const UserRoutes = router;
