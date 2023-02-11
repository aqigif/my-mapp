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
): Promise<PlaceDetailResponse> => {
  return axios({
    method: "get",
    // baseURL: "http://maps.googleapis.com",
    url: "/maps/api/place/details/json",
    params: {
      place_id: place_id,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
    },
  });
};
