import { useEffect } from 'react';
import {
  Container,
  Flex,
  Box,
  Text,
  Image,
  Grid,
  Button,
} from '@chakra-ui/react';
import { useGameControl } from '../../hooks/useGameControl';
import { setTimer } from '../../redux/gameControlSlice';
import { useAppDispatch, useAppSelector } from '../../redux/types/hooks';
import { RootState } from '../../redux/store';
import GameAnswerOption from './GameAnswerOption';

export default function GameQuestion() {
  const { checkAnswer, handleQuitBtn } = useGameControl();
  const { currentCountry, timer, nameOptions } = useAppSelector(
    (state: RootState) => state.gameControl
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerOut = setInterval(() => {
      if (timer === 0) {
        checkAnswer('');
        clearInterval(timerOut);
      } else {
        dispatch(setTimer(timer - 1));
      }
    }, 1000);

    return () => {
      clearInterval(timerOut);
    };
  }, [currentCountry, timer]);

  return (
    <Container width="100%" maxWidth="container.xl" marginTop={10}>
      <Flex
        direction="column"
        gap={10}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height={210}
          width={310}
          display={'flex'}
          justifyContent={'center'}
        >
          <Image
            maxH="full"
            maxW="full"
            boxShadow="dark-lg"
            src={currentCountry.flags.png}
          />
        </Box>
        <Text textAlign="center">Timer: {timer}</Text>
        <Grid width={310} templateColumns="repeat(2, 1fr)" gap={6}>
          {nameOptions?.map((country) => (
            <GameAnswerOption key={country} country={country} />
          ))}
        </Grid>
        <Button onClick={handleQuitBtn}>Quit</Button>
      </Flex>
    </Container>
  );
}
