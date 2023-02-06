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

export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
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
  searchOptions: PlaceType[];
  searchText: string;
  searchValue: PlaceType | null;
}

const initialState: MapState = {
  selectedPlace: null,
  searchOptions: [],
  searchText: '',
  searchValue: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    actionSelectPlace: (state, action: PayloadAction<SelectedPlaceType>) => {
      state.selectedPlace = action.payload;
      state.searchValue = {
        description: action.payload.description,
        structured_formatting: action.payload.structured_formatting,
        place_id: action.payload.place_id,
      }
      state.searchText = action.payload.structured_formatting.main_text
    },
    actionGetOptions: (state, action: PayloadAction<PlaceType[]>) => {
      state.searchOptions = action.payload;
    },
    actionSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    actionReset: (state) => {
      state = initialState
    }
  },
});

export const { actionSelectPlace, actionGetOptions, actionSearch, actionReset} = mapSlice.actions;

export const mapState = (state: RootState) => state.map;

export default mapSlice.reducer;
