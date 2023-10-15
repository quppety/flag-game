import { useEffect } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useGameControl } from './hooks/useGameControl';
import { useAppSelector } from './redux/types/hooks';
import { RootState } from './redux/store';
import Question from './components/Question';

export default function Home() {
  const { startGame, fetchGameData } = useGameControl();
  const { quizData, isGameRunning, userPoints, answered, isGameFinished } =
    useAppSelector((state: RootState) => state.gameControl);

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <Container height="100%" width="100%">
      {isGameRunning ? (
        <>
          <Heading
            as={'h2'}
            size="1xl"
            noOfLines={1}
            textAlign={'center'}
            marginTop={5}
          >
            Points: {userPoints} / {quizData.length}
          </Heading>
          <Question />
        </>
      ) : isGameFinished && answered.length !== 0 ? (
        <Flex
          direction={'column'}
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          <Heading
            as={'h2'}
            size="1xl"
            noOfLines={1}
            textAlign={'center'}
            marginTop={'20vh'}
          >
            That's all the countries!
          </Heading>
          <Text textAlign={'center'}>
            You chose {userPoints} correct countries out of {quizData.length}.
            Congrats!
          </Text>
          <Button onClick={startGame}>Go again</Button>
        </Flex>
      ) : (
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          direction={'column'}
          marginX={'auto'}
          marginY={'20vh'}
        >
          <Stack spacing={6} textAlign={'center'} marginBottom={5}>
            <Heading as="h1" size="2xl" noOfLines={1}>
              Guess the Flag
            </Heading>
            <Heading as="h2" size="1xl" noOfLines={3}>
              In this game you will be given a picture of a flag and names of
              four countries, your task is to piece those together correctly.
            </Heading>
            <Heading as="h2" size="1xl" noOfLines={2}>
              At the end of each round you can check your score and see if
              you've improved.
            </Heading>
            <Heading as="h2" size="1xl" noOfLines={1}>
              Good Luck!
            </Heading>
          </Stack>
          <Button onClick={startGame}>Play</Button>
        </Flex>
      )}
    </Container>
  );
}
