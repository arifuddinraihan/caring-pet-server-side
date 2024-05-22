import { AdoptionStatus } from "@prisma/client";
import { z } from "zod";

const createAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({
      required_error: "Pet Id is required.",
      invalid_type_error: "Pet Id must be string.",
    }),
    petOwnershipExperience: z.string({
      required_error: "Pet Ownership Experience is required.",
      invalid_type_error: "Pet Ownership Experience must be string.",
    }),
  }),
});

const updateAdoptionRequest = z.object({
  body: z.object({
    status: z.enum([AdoptionStatus.APPROVED, AdoptionStatus.REJECTED]),
  }),
});

export const AdoptionValidation = {
  createAdoptionRequest,
  updateAdoptionRequest,
};
