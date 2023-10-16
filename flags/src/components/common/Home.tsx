import { useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { useGameControl } from '../../hooks/useGameControl';
import { useAppSelector } from '../../redux/types/hooks';
import { RootState } from '../../redux/store';
import GameQuestion from '../game/GameQuestion';
import GameWelcomeScreen from '../game/GameWelcomeScreen';
import GameFinishedInfo from '../game/GameFinishedInfo';

export default function Home() {
  const { fetchGameData } = useGameControl();
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
          <GameQuestion />
        </>
      ) : isGameFinished && answered.length !== 0 ? (
        <GameFinishedInfo />
      ) : (
        <GameWelcomeScreen />
      )}
    </Container>
  );
}
