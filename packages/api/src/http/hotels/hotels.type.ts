import { z } from "zod";

const hotelSchema = z.object({
  _id: z.string(),
  chainName: z.string(),
  hotelName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable(),
  zipCode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  countryIsoCode: z.string().min(2).max(2),
  starRating: z.number(),
});

export type Hotel = z.infer<typeof hotelSchema>;
