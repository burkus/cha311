import { CircularProgress, Container } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container
      width="full"
      background="whiteAlpha.800"
      position="absolute"
      centerContent
      zIndex={99}
    >
      <CircularProgress size="2xs" isIndeterminate color="green.200" />
    </Container>
  );
};

export default Loading;
