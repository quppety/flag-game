import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useGameControl } from '../../hooks/useGameControl';
import { useAppSelector } from '../../redux/types/hooks';
import { RootState } from '../../redux/store';
import GameErrorMsg from './GameErrorMsg';

export default function GameFinishedInfo() {
  const { startGame } = useGameControl();
  const { quizData, userPoints, error } = useAppSelector(
    (state: RootState) => state.gameControl
  );

  return (
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
      {error && <GameErrorMsg />}
      <Button onClick={startGame}>Go again</Button>
    </Flex>
  );
}
