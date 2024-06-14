import express from "express";
import auth from "../../middlewares/auth";
import { AdoptionController } from "./adoption.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdoptionValidation } from "./adoption.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(), AdoptionController.getAllAdoptions);

router.get(
  "/:userId",
  auth(UserRole.USER),
  AdoptionController.getUserAdoptionRequests
);

router.put(
  "/:requestId",
  auth(),
  validateRequest(AdoptionValidation.updateAdoptionRequest),
  AdoptionController.updateAdoptionRequestStatus
);

export const OtherAdoptionRoutes = router;
