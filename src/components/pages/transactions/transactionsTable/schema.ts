import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  createdAt: z.string(),
  description: z.string(),
  category: z.string(),
  // label: z.string(),
  amount: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
