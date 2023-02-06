import axios, { AxiosResponse } from "axios";
import { PlaceDetailsType } from "./placeTypes";

interface PlaceDetailResponse extends AxiosResponse {
  data: {
    html_attributions: unknown[];
    status: string;
    result: PlaceDetailsType;
  };
}

export const getPlaceDetailService = async (
  place_id: string
): Promise<PlaceDetailResponse | null> => {
  try {
    const response = await axios({
      method: "get",
      baseURL: "https://maps.googleapis.com",
      url: "/maps/api/place/details/json",
      params: {
        place_id: place_id,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response ?? null;
    } else {
      return null;
    }
  }
};
