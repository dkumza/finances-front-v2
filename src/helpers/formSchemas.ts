import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// export const TransactionSchema = z.object({
//   category: z.string().nonempty({ message: 'Category is required' }),
//   description: z.string().nonempty({ message: 'Description is required' }),
//   amount: z.number().positive({ message: 'Amount must be a positive number' }),
//   date: z.date().({ message: 'Date is required' }),
// });
