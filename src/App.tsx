import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchAutocomplete from "./features/map/components/searchAutocomplete";
import Map, { MapWrapper } from "./features/map/Map";

export default function App() {
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
            <SearchAutocomplete />
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <div className="relative">
            <Map />
          </div>
        </Grid>
      </Grid>
    </MapWrapper>
  );
}
