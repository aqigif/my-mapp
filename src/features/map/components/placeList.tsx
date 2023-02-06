import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    debounce,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import parse from "autosuggest-highlight/parse";
import React from "react";
import { PlaceType, SelectedPlaceType, StructuredFormatting } from "../mapTypes";

const geocoder = { current: null };

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

export default function PlaceList({
  options,
  onSelectLocation,
  onSearchGetOptions,
}: {
  options: PlaceType[],
  onSelectLocation: (place: SelectedPlaceType) => void;
  onSearchGetOptions: (options: PlaceType[]) => void;
}) {
  
    React.useEffect(() => {
  
      if (!geocoder.current && (window as any).google) {
        geocoder.current = new (window as any).google.maps.Geocoder();
      }
      if (!geocoder.current) {
        return undefined;
      }

    }, []);
  
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
      onSearchGetOptions(place ? [...options] : options);
  
      onSelectFetch(
        { placeId: place.place_id },
        (results?: readonly PlaceDetailType[]) => {
          if (results?.[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
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
      );
    };
  return (
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
  );
}
