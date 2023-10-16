import { Button, GridItem } from '@chakra-ui/react';
import { useGameControl } from '../../hooks/useGameControl';

interface AnswerOptionProps {
  country: string;
}

export default function GameAnswerOption({ country }: AnswerOptionProps) {
  const { checkAnswer } = useGameControl();
  return (
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
  );
}
