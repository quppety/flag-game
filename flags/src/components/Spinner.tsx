import { Spinner, Container } from '@chakra-ui/react';
export default function Loading() {
  return (
    <Container height="100%" width="100%">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Container>
  );
}
