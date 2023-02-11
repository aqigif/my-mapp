import axios, { AxiosResponse } from "axios";
import { PlaceDetailsType } from "./types/placeTypes";
export const GOOGLE_IMAGE_STATIC = `/maps/api/place/photo?maxwidth=400&key=${process.env.REACT_APP_GOOGLE_API_KEY}&photoreference=`;

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
    url: "/maps/api/place/details/json",
    params: {
      place_id: place_id,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
    },
  });
};

export const getPhotoFromMap = async (
  photoReference: string
): Promise<PlaceDetailResponse> => {
  return axios({
    method: "get",
    url: "/maps/api/place/photo?maxwidth=400",
    params: {
      photoReference: photoReference,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
    },
  });
};
