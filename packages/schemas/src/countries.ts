import { z } from "zod";

export const countrySchema = z.object({
  _id: z.string(),
  country: z.string(),
  countryIsoCode: z.string().min(2).max(2),
});

export type Country = z.infer<typeof countrySchema>;
