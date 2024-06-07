import { z } from "zod";

const createPet = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be string.",
    }),
    petProfilePhoto: z.string({
      required_error: "Pet Profile Photo is required.",
      invalid_type_error: "Pet Profile Photo must be string.",
    }),
    morePetPhoto: z
      .array(
        z.string({
          required_error: "More Pet Photo is required.",
          invalid_type_error: "More Pet Photo must be string.",
        })
      )
      .optional(),
    species: z.string({
      required_error: "Species is required.",
      invalid_type_error: "Species must be string.",
    }),
    breed: z.string({
      required_error: "Breed is required.",
      invalid_type_error: "Breed must be string.",
    }),
    age: z.number({
      required_error: "Age is required.",
      invalid_type_error: "Age must be number.",
    }),
    size: z.string({
      required_error: "Size is required.",
      invalid_type_error: "Size must be string.",
    }),
    location: z.string({
      required_error: "Location is required.",
      invalid_type_error: "Location must be string.",
    }),
    description: z.string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be string.",
    }),
    temperament: z.string({
      required_error: "Temperament is required.",
      invalid_type_error: "Temperament must be string.",
    }),
    medicalHistory: z.string({
      required_error: "Medical History is required.",
      invalid_type_error: "Medical History must be string.",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption Requirements is required.",
      invalid_type_error: "Adoption Requirements must be string.",
    }),
  }),
});

const updatePet = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be string.",
      })
      .optional(),
    petProfilePhoto: z
      .string({
        required_error: "Species is required.",
        invalid_type_error: "Species must be string.",
      })
      .optional(),
    morePetPhoto: z
      .array(
        z.string({
          required_error: "Species is required.",
          invalid_type_error: "Species must be string.",
        })
      )
      .optional(),
    species: z
      .string({
        invalid_type_error: "Species must be string.",
      })
      .optional(),
    breed: z
      .string({
        invalid_type_error: "Breed must be string.",
      })
      .optional(),
    age: z
      .number({
        invalid_type_error: "Age must be number.",
      })
      .optional(),
    size: z
      .string({
        invalid_type_error: "Size must be string.",
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: "Location must be string.",
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: "Description must be string.",
      })
      .optional(),
    temperament: z
      .string({
        invalid_type_error: "Temperament must be string.",
      })
      .optional(),
    medicalHistory: z
      .string({
        invalid_type_error: "Medical History must be string.",
      })
      .optional(),
    adoptionRequirements: z
      .string({
        invalid_type_error: "Adoption Requirements must be string.",
      })
      .optional(),
  }),
});

export const PetValidation = {
  createPet,
  updatePet,
};
