import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/all-users",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getAllUsers
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.getMyProfile
);

router.put(
  "/update-my-profile",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(UserValidation.updateUser),
  UserController.updateCurrentUserProfile
);

router.put(
  "/change-password",
  auth(UserRole.USER),
  validateRequest(UserValidation.changeUserPassword),
  UserController.updateCurrentUserPassword
);

router.put(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidation.updateUserStatus),
  UserController.changeProfileStatus
);

router.put(
  "/:id/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.changeProfileRoleToAdmin
);

export const UserRoutes = router;
