import express from "express";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PetValidation } from "./pet.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(PetValidation.createPet),
  PetController.createPetProfile
);

router.post(
  "/bulk",
  auth(UserRole.SUPER_ADMIN),
  PetController.createManyPetProfiles
);

router.get("/new-pets", PetController.getDemoPets);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  PetController.getAllPets
);

router.get(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  PetController.getSinglePet
);

router.put(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(PetValidation.updatePet),
  PetController.updateSinglePet
);

router.delete(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PetController.deleteSinglePet
);

export const PetsRoutes = router;
