import z from "zod";
import { isActive, Role } from "./users.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name Cannot be exceed  50 character Long" }),
  email: z.email({ message: "Invalid Email Format" }),
  password: z
    .string()
    .min(8)
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d^$*.@#%&!~()\-_=+|:;",<>?/{}]+/,
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }
    ),
  phone: z
    .string()
    .min(11, { message: "Phone must be at least 11 characters" })
    .max(17, { message: "Phone Cannot be exceed 17 character Long" })
    .optional(),
  address: z.string().optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name Cannot be exceed  50 character Long" })
    .optional(),
  password: z
    .string()
    .min(8)
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d^$*.@#%&!~()\-_=+|:;",<>?/{}]+/,
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }
    )
    .optional(),
  phone: z
    .string()
    .min(11, { message: "Phone must be at least 11 characters" })
    .max(17, { message: "Phone Cannot be exceed 17 character Long" })
    .optional(),
  address: z.string().optional(),
  isDeleted: z
    .boolean({ message: "isDeleted Must be true or false" })
    .optional(),
  isActive: z.enum(Object.values(isActive) as [string]).optional(),
  isVerified: z
    .boolean({ message: "isVerified Must be true or false" })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
});
