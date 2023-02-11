import Close from "@mui/icons-material/Close";
import Search from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import * as React from "react";
import { PlaceType } from "../mapTypes";

const autocompleteService = { current: null };

export default function SearchAutocomplete({
  onSearchGetOptions,
  onReset,
  value,
  selected,
  onChange
}: {
  onSearchGetOptions: (options: PlaceType[]) => void;
  onReset: () => void;
  onChange: (text: string) => void;
  value: string;
  selected: PlaceType | null;
}) {

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

    if (value === "") {
      onSearchGetOptions(value ? [value] : [])
      
      return undefined;
    }

    fetch({ input: value }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: PlaceType[] = [];

        if (selected) {
          newOptions = [selected];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        if (onSearchGetOptions) {
          onSearchGetOptions(newOptions)
        }
      }
    });

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, value, fetch]);

  return (
    <>
      <TextField
        id="google-map-textfield"
        fullWidth
        value={value}
        onChange={(event) => {
          onReset();
          onChange(event.target.value);
        }}
        placeholder="Find your desired place ..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value ? (
                <IconButton onClick={() => {
                  onReset()
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
    </>
  );
}
