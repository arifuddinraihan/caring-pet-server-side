import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

// router.get(
//   "/",
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   UserController.getUserProfile
// );

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getAllUsers
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.getMyProfile
);

router.patch(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(UserValidation.updateUser),
  UserController.changeProfileStatus
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
  validateRequest(UserValidation.updateUserRole),
  UserController.changeProfileRoleToAdmin
);

export const UserRoutes = router;
