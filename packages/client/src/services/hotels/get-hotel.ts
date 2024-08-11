import type { Hotel } from "schemas";
import { API_URL } from "../const";

export async function getHotelById(hotelId: string) {
  const hotelData = await fetch(`${API_URL}/hotels/${hotelId}`);
  const { hotel } = (await hotelData.json()) as { hotel: Hotel };

  return hotel;
}
