import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useGameControl } from '../../hooks/useGameControl';
import { useAppSelector } from '../../redux/types/hooks';
import { RootState } from '../../redux/store';
import GameErrorMsg from './GameErrorMsg';

export default function GameWelcomeScreen() {
  const { startGame } = useGameControl();
  const { error } = useAppSelector((state: RootState) => state.gameControl);
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
      marginX={'auto'}
      marginY={'20vh'}
    >
      <Stack spacing={6} textAlign={'center'} marginBottom={5}>
        <Heading as="h1" size="2xl" noOfLines={1} paddingBottom={2}>
          Guess the Flag
        </Heading>
        <Heading as="h2" size="1xl" noOfLines={3}>
          In this game you will be given a picture of a flag and names of four
          countries, your task is to piece those together correctly.
        </Heading>
        <Heading as="h2" size="1xl" noOfLines={2}>
          At the end of each round you can check your score and see if you've
          improved.
        </Heading>
        <Heading as="h2" size="1xl" noOfLines={1}>
          Good Luck!
        </Heading>
      </Stack>
      {error && <GameErrorMsg />}
      <Button onClick={startGame}>Play</Button>
    </Flex>
  );
}
