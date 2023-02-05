import counterReducer, {
  // MapState,
  // selectPlace,
} from './mapSlice';

describe('map reducer', () => {
  // const initialState: MapState = {
  //   selectedPlace: null
  // };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      selectedPlace: null,
    });
  });

  // it('should handle select place', () => {
  //   const actual = counterReducer(initialState, selectPlace({
      
  //   }));
  //   expect(actual.selectedPlace).toEqual(null);
  // });
});
