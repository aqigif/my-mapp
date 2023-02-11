import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MapViewer from "./components/mapViewer";
import MapWrapper from "./components/mapWrapper";
import PlaceDetail from "./components/placeDetail";
import PlaceList from "./components/placeList";
import SearchAutocomplete from "./components/searchAutocomplete";
import { getPlaceDetailService } from "./mapService";
import {
  actionGetOptions,
  actionReset,
  actionSearch,
  actionSelectPlace,
  mapState,
} from "./mapSlice";
import { PlaceType, SelectedPlaceType } from "./types/mapTypes";

export default function Map() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const mapStateData = useAppSelector(mapState);
  const { selectedPlace, searchValue, searchText, searchOptions } =
    mapStateData;
  const center = selectedPlace?.location ?? {
    lat: 38.886518,
    lng: -121.0166301,
  };
  const selectedLocation = selectedPlace?.location ?? null;

  const onSelectLocation = async (place: SelectedPlaceType) => {
    try {
      const res = await getPlaceDetailService(place.place_id);
      console.log(res);
      if (res.status === 200 && res.data?.result?.place_id) {
        const result = res.data?.result;
        dispatch(
          actionSelectPlace({
            description: place.description,
            structured_formatting: place.structured_formatting,
            place_id: place.place_id,
            location: {
              lat: result?.geometry?.location?.lat,
              lng: result?.geometry?.location?.lng,
            },
            detail: res.data?.result,
          })
        );
      } else throw res;
    } catch (error) {
      enqueueSnackbar("An error occurred, try again", { variant: "error" });
      console.log(error);
    }
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
        <Typography variant="h6">{"Please try again later :)"}</Typography>
        <Typography>
          {"Sorry, unfortunately you can't access MyMapp right now"}
        </Typography>
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
            {selectedPlace?.detail ? (
              <PlaceDetail data={selectedPlace?.detail} />
            ) : (
              <PlaceList
                onSearchGetOptions={handleGetSearchOptions}
                onSelectLocation={onSelectLocation}
                options={searchOptions}
              />
            )}
          </Box>
          {selectedLocation && (
            <Grid item xs={12} sm={false} md={false} lg={false} xl={false}>
              <div className="relative md:hidden">
                <MapViewer center={center} marker={selectedLocation} />
              </div>
            </Grid>
          )}
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <div className="relative">
            <MapViewer center={center} marker={selectedLocation} />
          </div>
        </Grid>
      </Grid>
    </MapWrapper>
  );
}
