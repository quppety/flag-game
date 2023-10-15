import {
  Container,
  Flex,
  Box,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../redux/types/hooks';
import { RootState } from '../redux/store';
import {
  setIsGameFinished,
  setIsGameRunning,
  setPointsHistory,
} from '../redux/gameControlSlice';
import { useGameControl } from '../hooks/useGameControl';

export default function Question() {
  const { checkAnswer } = useGameControl();
  const { currentCountry, timer, nameOptions, userPoints } = useAppSelector(
    (state: RootState) => state.gameControl
  );

  const dispatch = useAppDispatch();
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
            <GridItem
              key={country}
              border="1px"
              borderRadius="8px"
              height={79}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                width="full"
                height="full"
                backgroundColor="transparent"
                textAlign="center"
                wordBreak="break-word"
                whiteSpace="normal"
                onClick={() => checkAnswer(country)}
              >
                {country}
              </Button>
            </GridItem>
          ))}
        </Grid>
        <Button
          onClick={() => {
            dispatch(setIsGameFinished(true));
            dispatch(setIsGameRunning(false));
            dispatch(setPointsHistory(userPoints));
          }}
        >
          Quit
        </Button>
      </Flex>
    </Container>
  );
}
