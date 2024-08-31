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
    .string({ message: 'Amount cannot be 0' })
    .min(1, 'Amount is required')
    .refine(
      (value) => value !== null && !isNaN(Number(value)) && Number(value) > 0,
      {
        message: 'Amount must be a number greater than 0',
      }
    )
    .transform((value) => Number(value)),
  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(3, 'Description must be at least 3 characters long.'),
  date: z.date({
    required_error: 'Transaction date is required.',
  }),
});
