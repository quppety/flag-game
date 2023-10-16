import { Heading } from '@chakra-ui/react';
import { useAppSelector } from '../redux/types/hooks';
import { RootState } from '../redux/store';

export default function ErrorMsg() {
  const { error } = useAppSelector((state: RootState) => state.gameControl);

  return (
    <Heading as="h2" size="1xl" noOfLines={1} marginY={2}>
      {error}
    </Heading>
  );
}
