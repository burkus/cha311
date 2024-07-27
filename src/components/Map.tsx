import { Map as GoogleMaps, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Box } from "@chakra-ui/react";
import { useEffect} from "react";
import { useAtom } from "jotai";

import store from '../store'

const Map = () => {
    const [location, setLocation] = useAtom(store.location)

    useEffect(() => {
        navigator.geolocation.watchPosition((data => setLocation({
            lat: data.coords.latitude,
            lng: data.coords.longitude
        })))
    }, [setLocation])

  return (
    <Box width={"100%"} height={300} >
      <GoogleMaps
        defaultZoom={10}
        defaultCenter={location}
        disableDefaultUI
        mapId={"adb96d83673bf1c3"}
      >
        <AdvancedMarker
          position={location}
        >
          <div style={{ color: "red", fontSize: 30 }}>📍</div>
        </AdvancedMarker>
      </GoogleMaps>
    </Box>
  );
};

export default Map;
