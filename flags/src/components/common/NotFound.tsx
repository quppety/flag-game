import { Container, Stack, Heading } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container height="100%" width="100%">
      <Stack spacing={6} textAlign={'center'} marginTop={40}>
        <Heading as="h1" size="5xl" noOfLines={1}>
          404
        </Heading>
        <Heading as="h2" size="1xl" noOfLines={1}>
          Page not found
        </Heading>
      </Stack>
    </Container>
  );
}
