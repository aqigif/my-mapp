export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Close {
  date: string;
  day: number;
  time: string;
}

export interface Open {
  date: string;
  day: number;
  time: string;
}

export interface Period {
  close: Close;
  open: Open;
}

export interface CurrentOpeningHours {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Close2 {
  day: number;
  time: string;
}

export interface Open2 {
  day: number;
  time: string;
}

export interface Period2 {
  close: Close2;
  open: Open2;
}

export interface OpeningHours {
  open_now: boolean;
  periods: Period2[];
  weekday_text: string[];
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export interface PlaceDetailsType {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  current_opening_hours: CurrentOpeningHours;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
}
