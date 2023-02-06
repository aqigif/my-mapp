import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "./features/map/Map";
import SearchAutocomplete from "./features/map/components/searchAutocomplete";
import MapWrapper from "./features/map/components/mapWrapper";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  actionGetOptions,
  actionReset,
  actionSearch,
  actionSelectPlace,
  mapState,
} from "./features/map/mapSlice";
import {
  PlaceType,
  SelectedPlaceType,
} from "./features/map/mapTypes"
import PlaceList from "./features/map/components/placeList";
import { Typography } from "@mui/material";
import { getPlaceDetailService } from "./features/map/mapService";

export default function App() {
  const dispatch = useAppDispatch();
  const mapStateData = useAppSelector(mapState);
  const { selectedPlace, searchValue, searchText, searchOptions } =
    mapStateData;
  const center = selectedPlace?.location ?? {
    lat: 38.886518,
    lng: -121.0166301,
  };
  const selectedLocation = selectedPlace?.location ?? null;

  const onSelectLocation = (place: SelectedPlaceType) => {
    getPlaceDetailService(place.place_id)
    dispatch(
      actionSelectPlace({
        description: place.description,
        structured_formatting: place.structured_formatting,
        place_id: place.place_id,
        location: {
          lat: place.location.lat,
          lng: place.location.lng,
        },
      })
    );
  };

  const handleSearchText = (text: string) => {
    dispatch(actionSearch(text));
  };

  const handleGetSearchOptions = (options: PlaceType[]) => {
    dispatch(actionGetOptions(options));
  };

  const handleReset = () => {
    dispatch(actionReset());
  };

  const mapsKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // if no API KEY
  if (!mapsKey)
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <img
          src="/static/images/brands/my-mapp-logo.png"
          alt="brand-logo"
          className="h-20 mb-5 -mt-10"
        />
        <Typography variant="h6">
          {"Please try again later :)"}
        </Typography>
        <Typography>{"Sorry, unfortunately you can access MyMapp right now"}</Typography>
      </div>
    );

  return (
    <MapWrapper googleMapsApiKey={mapsKey}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/static/images/brands/my-mapp-logo.png"
              alt="brand-logo"
              className="h-20 mb-5 -mt-10"
            />
            <SearchAutocomplete
              value={searchText}
              selected={searchValue}
              onReset={handleReset}
              onChange={handleSearchText}
              onSearchGetOptions={handleGetSearchOptions}
            />
            <PlaceList
              onSearchGetOptions={handleGetSearchOptions}
              onSelectLocation={onSelectLocation}
              options={searchOptions}
            />
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <div className="relative">
            <Map center={center} marker={selectedLocation} />
          </div>
        </Grid>
      </Grid>
    </MapWrapper>
  );
}
