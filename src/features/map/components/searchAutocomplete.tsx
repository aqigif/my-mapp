import LocationOnIcon from "@mui/icons-material/LocationOn";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import { Box } from "@mui/system";
import parse from "autosuggest-highlight/parse";
import * as React from "react";
import { SelectedPlaceType } from "../mapSlice";

const autocompleteService = { current: null };
const geocoder = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}
interface PlaceDetailType {
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

export default function SearchAutocomplete({
  onSelectLocation,
}: {
  onSelectLocation?: (place: SelectedPlaceType) => void;
}) {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (!geocoder.current && (window as any).google) {
      geocoder.current = new (window as any).google.maps.Geocoder();
    }
    if (!geocoder.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const onSelectFetch = React.useMemo(
    () =>
      debounce(
        (
          request: { placeId: string },
          callback: (results?: readonly PlaceDetailType[]) => void
        ) => {
          (geocoder.current as any).geocode(request, callback);
        },
        400
      ),
    []
  );

  const onSelect = (place: PlaceType) => {
    setOptions(place ? [...options] : options);
    setValue(place);
    setInputValue(place.structured_formatting.main_text);

    onSelectFetch(
      { placeId: place.place_id },
      (results?: readonly PlaceDetailType[]) => {
        if (results?.[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          if (onSelectLocation) {
            onSelectLocation({
              description: place.description,
              structured_formatting: place.structured_formatting,
              place_id: place.place_id,
              location: {
                lat,
                lng,
              },
            });
          }
        }
      }
    );
  };
  return (
    <>
      <TextField
        id="google-map-demo"
        fullWidth
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Find your desired place ..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {inputValue ? (
                <IconButton onClick={() => {
                  setInputValue("");
                  setValue(null)
                  setOptions([])
                }}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </InputAdornment>
          ),
        }}
      />

      <List disablePadding className="mx-0 w-full">
        {options.map((option, index) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          return (
            <ListItem disablePadding key={option.place_id + index}>
              <ListItemButton
                className="px-0 w-full"
                onClick={() => {
                  onSelect(option);
                }}
              >
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </ListItemIcon>
                <div className="flex flex-col">
                  <span className="flex flex-wrap">
                    {parts.map((part, index) => (
                      <Box
                        key={index + "parts"}
                        component="span"
                        className="mr-1"
                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                      >
                        {part.text}
                      </Box>
                    ))}
                  </span>
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
