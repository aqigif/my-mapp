import {
  GoogleMap, MarkerF, useLoadScript
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

export const MapWrapper = ({children, googleMapsApiKey}: {children: React.ReactNode, googleMapsApiKey: string}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"]
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <>{children}</>
}

function Map() {
  const center = useMemo(() => ({ lat: 38.886518, lng: -121.0166301 }), []);
  const [, setSelectedMarker] = useState<Coordinates | null>(center);

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


export default Map;