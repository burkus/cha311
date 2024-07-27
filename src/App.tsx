import "./App.css";
import { Container, Grid, Heading } from "@chakra-ui/react";

import Map from "./components/Map";
import Form from "./components/Form";

function App() {
  return (
    <Container width="full" height="100vh">
      <Heading>Chattanooga 311 Mobile App</Heading>
      <Grid padding={3}>
        <Map />
        <Form />
      </Grid>
    </Container>
  );
}

export default App;
