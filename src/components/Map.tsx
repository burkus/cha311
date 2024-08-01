import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAtom } from "jotai";

import store from "../store";

const UpdateCenter = ({ location }: {location: {lat: number, lng: number}}) => {
    const map = useMap()
    map.setView([location.lat, location.lng])
    return null
}

const Map = () => {
  const [location, setLocation] = useAtom(store.location);

  useEffect(() => {
    navigator.geolocation.watchPosition((data) => {
      setLocation({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      });
    });
  }, [setLocation]);


  return (
    <Box width={"100%"} height={300}>
      <MapContainer
        style={{ height: "100%" }}
        zoom={13}
        center={[location.lat, location.lng]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>You are here</Popup>
        </Marker>
        <UpdateCenter location={location} />
      </MapContainer>
    </Box>
  );
};

export default Map;
