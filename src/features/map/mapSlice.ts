import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: MainTextMatchedSubstrings[];
}
export interface SelectedPlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface MapState {
  selectedPlace: SelectedPlaceType | null;
}

const initialState: MapState = {
  selectedPlace: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    selectPlace: (state, action: PayloadAction<SelectedPlaceType>) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { selectPlace } = mapSlice.actions;

export const selectedPlaceData = (state: RootState) => state.map.selectedPlace;

export default mapSlice.reducer;
