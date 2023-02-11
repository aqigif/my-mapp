import { AxiosResponse } from "axios";
import client from "../../services";
import { PlaceDetailsType } from "./types/placeTypes";
export const GOOGLE_IMAGE_STATIC = `${process.env.REACT_APP_PROXY_URL}/maps/photo/400/`;

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
    url: "/maps/"+place_id,
  });
};

export const getPhotoFromMap = async (
  photoReference: string
): Promise<PlaceDetailResponse> => {
  return client({
    method: "get",
    baseURL: "https://maps.googleapis.com",
    url: "/maps/api/place/photo?maxwidth=400",
    params: {
      photoReference: photoReference,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
    },
  });
};
