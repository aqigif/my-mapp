import { useLoadScript } from "@react-google-maps/api";
import React from "react";

export const MapWrapper = ({
  children,
  googleMapsApiKey,
}: {
  children: React.ReactNode;
  googleMapsApiKey: string;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <>{children}</>;
};

export default MapWrapper;
