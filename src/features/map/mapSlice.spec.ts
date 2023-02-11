import { dummySearchOptions, dummySelectData } from "./dummy";
import mapSlice, { actionGetOptions, actionReset, actionSearch, actionSelectPlace } from "./mapSlice";
import { MapState } from "./types/mapTypes";

describe("map reducer", () => {
  const initialState: MapState = {
    selectedPlace: null,
    searchOptions: [],
    searchText: "",
    searchValue: null,
  };
  it("should handle initial state", () => {
    expect(mapSlice(undefined, { type: "unknown" })).toEqual({
      selectedPlace: initialState.selectedPlace,
      searchOptions: initialState.searchOptions,
      searchText: initialState.searchText,
      searchValue: initialState.searchValue,
    });
  });
  it("should handle action Select Place", () => {
    const actual = mapSlice(initialState, actionSelectPlace(dummySelectData));
    expect(actual.selectedPlace).toEqual(dummySelectData);
    expect(actual.searchValue).toEqual({
      description: dummySelectData.description,
      structured_formatting: dummySelectData.structured_formatting,
      place_id: dummySelectData.place_id,
    });
    expect(actual.searchText).toEqual(
      dummySelectData.structured_formatting.main_text
    );
  });
  it("should handle action Search Options", () => {
    const actual = mapSlice(initialState, actionGetOptions(dummySearchOptions));
    expect(actual.searchOptions).toEqual(dummySearchOptions);
  });
  it("should handle action Search Text", () => {
    const actual = mapSlice(initialState, actionSearch("Tesl"));
    expect(actual.searchText).toEqual('Tesl');
  });
  it("should handle action Reset", () => {
    const actual = mapSlice(initialState, actionReset());
    expect(actual.searchText).toEqual('');
    expect(actual.searchOptions).toEqual([]);
    expect(actual.searchValue).toEqual(null);
    expect(actual.selectedPlace).toEqual(null);
  });
});
