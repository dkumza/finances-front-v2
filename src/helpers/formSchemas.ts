import { z } from 'zod';

const allowedCategories = [
  'salary',
  'rent',
  'groceries',
  'utilities',
  'entertainment',
] as const;

type Category = (typeof allowedCategories)[number];

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const TransactionSchema = z.object({
  category: z
    .string()
    .refine((val) => allowedCategories.includes(val as Category), {
      message: 'Category is required',
    }),
  amount: z
    .number({
      required_error: 'Amount is required.',
    })
    .positive('Amount must be greater than 0'),
  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(3, 'Description must be at least 3 characters long.'),
  date: z.date({
    required_error: 'Transaction date is required.',
  }),
});
