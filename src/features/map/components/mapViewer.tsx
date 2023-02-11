import { GoogleMap, MarkerF } from "@react-google-maps/api";

function MapViewer({
  center,
  marker,
}: {
  center?: google.maps.LatLng | google.maps.LatLngLiteral;
  marker?: google.maps.LatLng | google.maps.LatLngLiteral | null;
}) {
  return (
    <>
      <div className="">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="w-full h-screen"
        >
          {marker && <MarkerF position={marker}></MarkerF>}
        </GoogleMap>
      </div>
    </>
  );
}

export default MapViewer;
