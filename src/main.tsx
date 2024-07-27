import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { APIProvider } from "@vis.gl/react-google-maps";

import App from "./App.tsx";
import "./index.css";

const MAPS_API_KEY = "AIzaSyB1Bt6ApCVd2e1je9Ifx_fR4hwSXIN5PWQ";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <APIProvider apiKey={MAPS_API_KEY}>
        <App />
      </APIProvider>
    </ChakraProvider>
  </React.StrictMode>
);
