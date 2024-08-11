import { z } from "zod";
import { countrySchema } from "./countries";

export const hotelSchema = z.intersection(
  z.object({
    _id: z.string(),
    chainName: z.string(),
    hotelName: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    zipCode: z.string(),
    city: z.string(),
    state: z.string(),
    starRating: z.number(),
  }),
  countrySchema
);

export type Hotel = z.infer<typeof hotelSchema>;
