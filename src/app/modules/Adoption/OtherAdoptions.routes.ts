import express from "express";
import auth from "../../middlewares/auth";
import { AdoptionController } from "./adoption.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdoptionValidation } from "./adoption.validation";

const router = express.Router();

router.get("/", auth(), AdoptionController.getAllAdoptions);

router.put(
  "/:requestId",
  auth(),
  validateRequest(AdoptionValidation.updateAdoptionRequest),
  AdoptionController.updateAdoptionRequestStatus
);

export const OtherAdoptionRoutes = router;
