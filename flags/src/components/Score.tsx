import {
  Container,
  Stat,
  StatHelpText,
  Heading,
  StatNumber,
} from '@chakra-ui/react';
import { useAppSelector } from '../redux/types/hooks';
import { RootState } from '../redux/store';

export default function Score() {
  const { pointsHistory, quizData } = useAppSelector(
    (state: RootState) => state.gameControl
  );

  return (
    <Container height="100%" width="100%">
      {pointsHistory?.length > 0 ? (
        <>
          <Heading
            as={'h2'}
            size="xl"
            noOfLines={1}
            textAlign={'center'}
            marginY={'5vh'}
          >
            Your points history
          </Heading>
          {pointsHistory?.map((el, i) => {
            const [points, date] = el.split(', ');

            return (
              <Stat key={i} alignContent={'center'}>
                <StatNumber>
                  {points}/{quizData?.length}
                </StatNumber>
                <StatHelpText>{date}</StatHelpText>
              </Stat>
            );
          })}
        </>
      ) : (
        <Heading
          as={'h2'}
          size="1xl"
          noOfLines={1}
          textAlign={'center'}
          marginTop={'20vh'}
        >
          You don't have a points history yet
        </Heading>
      )}
    </Container>
  );
}
