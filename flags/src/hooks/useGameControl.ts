import {
  restartGame,
  setAnswered,
  setCurrentCountry,
  setIsGameFinished,
  setIsGameRunning,
  setNameOptions,
  setPointsHistory,
  setQuizData,
  setTimer,
  setUserPoints,
} from '../redux/gameControlSlice';
import { useAppDispatch, useAppSelector } from '../redux/types/hooks';
import { RootState } from '../redux/store';
import { Country } from '../redux/types/gameControlTypes';

export const useGameControl = () => {
  const { quizData, currentCountry, answered, userPoints } = useAppSelector(
    (state: RootState) => state.gameControl
  );
  const dispatch = useAppDispatch();

  const getCurrentCountry = async (): Promise<void | string> => {
    const randomCountry = await quizData[Math.floor(Math.random() * 193)];
    const wasAnswered = answered.filter(
      (country) => country.name.common === randomCountry.name.common
    );
    if (wasAnswered.length === 0) {
      dispatch(setCurrentCountry(randomCountry));
      dispatch(setAnswered(randomCountry));
      return randomCountry.name.common;
    } else if (answered.length === 193) {
      dispatch(setIsGameFinished(true));
      dispatch(setIsGameRunning(false));
      dispatch(setPointsHistory(userPoints));
      return;
    } else {
      return getCurrentCountry();
    }
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const getThreeRandomCountryNames = (countryName: string | void): void => {
    const threeRandomCountries: Country[] = [];
    for (let i = 0; i < 3; i += 1) {
      let randomCountryData: Country;
      do {
        randomCountryData = quizData[Math.floor(Math.random() * 193)];
      } while (
        threeRandomCountries.some(
          (country) => country.name.common === randomCountryData.name.common
        ) ||
        randomCountryData.name.common === countryName
      );

      threeRandomCountries.push(randomCountryData);
    }

    const getNames = threeRandomCountries?.map(
      (country) => country.name.common
    );
    getNames.push(countryName!);
    const shuffledCountryNames = shuffleArray(getNames);
    dispatch(setNameOptions(shuffledCountryNames));
  };

  const fetchGameData = () => {
    fetch(
      'https://restcountries.com/v3.1/independent?status=true&fields=name,flags'
    )
      .then((response) => response.json())
      .then((data) => dispatch(setQuizData(data)));
  };

  const startGame = async (): Promise<void> => {
    try {
      dispatch(restartGame());
      const currCountryName = await getCurrentCountry();
      await getThreeRandomCountryNames(currCountryName);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswer = async (userAnswer: string): Promise<void> => {
    if (userAnswer === currentCountry.name.common) {
      dispatch(setUserPoints(userPoints + 1));
      const currCountryName = await getCurrentCountry();
      await getThreeRandomCountryNames(currCountryName);
      dispatch(setTimer(10));
    } else {
      const currCountryName = await getCurrentCountry();
      await getThreeRandomCountryNames(currCountryName);
      dispatch(setTimer(10));
    }
  };

  return {
    startGame,
    fetchGameData,
    checkAnswer,
  };
};
