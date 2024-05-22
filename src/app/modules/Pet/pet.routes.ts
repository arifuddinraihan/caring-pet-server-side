import express from "express";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PetValidation } from "./pet.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(PetValidation.createPet),
  PetController.createPetProfile
);

router.get("/", auth(), PetController.getAllPets);

router.put(
  "/:petId",
  auth(),
  validateRequest(PetValidation.updatePet),
  PetController.updateSinglePet
);

export const PetsRoutes = router;
