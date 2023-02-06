import { useLoadScript } from "@react-google-maps/api";
import React from "react";

const MapWrapper = ({
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
  if (!isLoaded)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <img
          src="/static/images/gif/loading-map.gif"
          alt="brand-logo"
          className="h-20 mb-5 -mt-10"
        />
      </div>
    );
  return <>{children}</>;
};

export default MapWrapper;
