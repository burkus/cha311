import { Progress, Container } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container
    >
      <Progress size='sm' isIndeterminate colorScheme="green" />
    </Container>
  );
};

export default Loading;
