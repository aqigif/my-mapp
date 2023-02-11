
import { PlaceDetailsType } from "./placeTypes";
interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: MainTextMatchedSubstrings[];
}

export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}
export interface SelectedPlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
  location?: {
    lat: number;
    lng: number;
  };
  detail?: PlaceDetailsType;
}

export interface PlaceDetailGeoCodeType {
    description: string;
    structured_formatting: StructuredFormatting;
    place_id: string;
    geometry: {
      location: {
        lat: () => number;
        lng: () => number;
      };
    };
  }
export interface MapState {
  selectedPlace: SelectedPlaceType | null;
  searchOptions: PlaceType[];
  searchText: string;
  searchValue: PlaceType | null;
}
