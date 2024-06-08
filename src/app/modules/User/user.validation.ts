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

const changeUserPassword = z.object({
  body: z.object({
    currentPassword: z.string({
      invalid_type_error: "Current Password must be string.",
    }),
    newPassword: z.string({
      invalid_type_error: "New Password must be string.",
    }),
  }),
});

const updateUserRole = z.object({
  body: z.object({
    role: z.string({
      invalid_type_error: "Role must be string.",
    }),
  }),
});

const updateUserStatus = z.object({
  body: z.object({
    activeStatus: z.string({
      invalid_type_error: "Status must be string.",
    }),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
  changeUserPassword,
  updateUserRole,
  updateUserStatus,
};
