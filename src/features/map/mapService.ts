import { AxiosResponse } from "axios";
import client from "../../services";
import { PlaceDetailsType } from "./types/placeTypes";
export const GOOGLE_IMAGE_STATIC = `${process.env.REACT_APP_PROXY_URL}/maps-photo/${process.env.REACT_APP_GOOGLE_API_KEY}/`;

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
  return client({
    method: "get",
    url: "/maps",
    params: {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      place_id: place_id
    }
  });
};