import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import parse from "autosuggest-highlight/parse";
import { PlaceType, SelectedPlaceType } from "../mapTypes";

export default function PlaceList({
  options,
  onSelectLocation,
  onSearchGetOptions,
}: {
  options: PlaceType[];
  onSelectLocation: (place: SelectedPlaceType) => void;
  onSearchGetOptions: (options: PlaceType[]) => void;
}) {
  const onSelect = async (place: PlaceType) => {
    onSearchGetOptions(place ? [...options] : options);
    onSelectLocation({
      description: place.description,
      structured_formatting: place.structured_formatting,
      place_id: place.place_id,
    });
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
