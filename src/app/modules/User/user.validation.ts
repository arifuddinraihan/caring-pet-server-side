import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be string.",
    }),
    email: z.string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be string.",
    }),
    password: z.string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be string.",
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be string.",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be string.",
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
};
