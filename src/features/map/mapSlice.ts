import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { MapState, PlaceType, SelectedPlaceType } from "./types/mapTypes";

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
      state.selectedPlace = initialState.selectedPlace;
      state.searchOptions = initialState.searchOptions;
      state.searchText = initialState.searchText;
      state.searchValue = initialState.searchValue;
    }
  },
});

export const { actionSelectPlace, actionGetOptions, actionSearch, actionReset} = mapSlice.actions;

export const mapState = (state: RootState) => state.map;

export default mapSlice.reducer;
