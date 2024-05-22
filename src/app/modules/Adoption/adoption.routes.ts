import express from "express";
import auth from "../../middlewares/auth";
import { AdoptionController } from "./adoption.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdoptionValidation } from "./adoption.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(AdoptionValidation.createAdoptionRequest),
  AdoptionController.createAdoptionRequest
);

export const AdoptionRoutes = router;
