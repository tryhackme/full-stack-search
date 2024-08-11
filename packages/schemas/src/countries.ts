import { z } from "zod";

export const countrySchema = z.object({
  country: z.string(),
  countryIsoCode: z.string().min(2).max(2),
});

export type Country = z.infer<typeof countrySchema>;
