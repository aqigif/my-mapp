import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "./features/map/Map";
import SearchAutocomplete from "./features/map/components/searchAutocomplete";
import MapWrapper from "./features/map/components/mapWrapper";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectedPlaceData, SelectedPlaceType, selectPlace } from "./features/map/mapSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const selectedPlace = useAppSelector(selectedPlaceData);
  const center = selectedPlace?.location ?? {
    lat: 38.886518,
    lng: -121.0166301,
  };
  const selectedLocation = selectedPlace?.location ?? null;
  
  const onSelectLocation = (place: SelectedPlaceType) => {
    dispatch(selectPlace({
      description: place.description,
      structured_formatting: place.structured_formatting,
      place_id: place.place_id,
      location: {
        lat: place.location.lat,
        lng: place.location.lng,
      },
    }));
  }
  
  const mapsKey = process.env.REACT_APP_GOOGLE_API_KEY;
  if (!mapsKey) return <div>no API Key</div>;

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
            <img src="/my-mapp-logo.png" alt="brand-logo" className="h-20 mb-5 -mt-10" />
            <SearchAutocomplete onSelectLocation={onSelectLocation} />
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
