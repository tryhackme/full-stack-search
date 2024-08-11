import { z } from "zod";

export const citySchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type City = z.infer<typeof citySchema>;
