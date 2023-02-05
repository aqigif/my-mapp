import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

export default function GoogleMaps() {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <div>Error</div>;
  }
  return <Map googleMapsApiKey={googleMapsApiKey} />;
}

type Coordinates = {
  lat: number;
  lng: number;
};
type MapProps = {
  googleMapsApiKey: string;
};

function Map({ googleMapsApiKey }: MapProps) {
  const center = useMemo(() => ({ lat: 38.886518, lng: -121.0166301 }), []);
  const [, setSelectedMarker] = useState<Coordinates | null>(
    center
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
        >
          <MarkerF
            position={center}
            onClick={() => {
              setSelectedMarker(center);
            }}
          >
            {/* {selectedMarker && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedMarker(null);
                }}
                position={center}
              >
                <a
                  href="https://www.google.com/maps/dir/api=1&amp;destination=3006%20CA-49,%20Cool,%20CA%2095614,%20USA"
                  target="_blank"
                  aria-label="open link to directions to cool gym hwy 49"
                  className="underline hover:text-blue-750" rel="noreferrer"
                >
                  Directions
                </a>
              </InfoWindow>
            )} */}
          </MarkerF>
        </GoogleMap>
      </div>
    </>
  );
}
