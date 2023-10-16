import {
  finishGame,
  restartGame,
  setAnswered,
  setCurrentCountry,
  setError,
  setIsGameFinished,
  setNameOptions,
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

  /**
   * Fetches quiz data from the API and dispatches it to the store.
   * The fetched data includes information about countries with their names and flags.
   */
  const fetchGameData = () => {
    fetch(
      'https://restcountries.com/v3.1/independent?status=true&fields=name,flags'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch(setQuizData(data)))
      .catch((error) => {
        console.error('An error occurred while fetching game data:', error);
        dispatch(
          setError(
            "Couldn't load the list of countries, please try again later"
          )
        );
        setTimeout(() => {
          dispatch(setError(''));
        }, 1500);
      });
  };

  /**
   * Initiates the game by restarting, getting the current country, and populating the options.
   * @returns {Promise<void>}
   */
  const startGame = async (): Promise<void> => {
    try {
      dispatch(restartGame());
      // Get the name of the current country and populate options
      const currCountryName = getCurrentCountry();
      getThreeRandomCountryNames(currCountryName);
    } catch (error) {
      // Handle errors
      console.error('An error occurred while starting the game:', error);
    }
  };

  /**
   * Gets a random country from the quizData and ensures it hasn't been answered before.
   * If it's a new country, it updates the current country, the answered list, and returns the country's name.
   * If all countries have been answered, it finishes the game.
   * @returns {Promise<void | string>} The name of the current country or void if the game is finished.
   */
  const getCurrentCountry = (): void | string => {
    // Select a random country from the quizData array
    const randomCountry = quizData[Math.floor(Math.random() * quizData.length)];
    // Check if the selected country has already been answered
    const wasAnswered = answered.filter(
      (country) => country.name.common === randomCountry.name.common
    );
    // If the country hasn't been answered yet
    if (wasAnswered.length === 0) {
      // Update the current country, the answered list, and return the country's name
      dispatch(setCurrentCountry(randomCountry));
      dispatch(setAnswered(randomCountry));
      return randomCountry.name.common;
    } // If all countries have been answered
    else if (answered.length === quizData.length) {
      // Finish the game
      dispatch(finishGame());
      return;
    } else {
      // If the country was already answered, run again
      return getCurrentCountry();
    }
  };

  /**
   * Generates an array of three random country names for the quiz, ensuring they are distinct from a provided country name.
   * @param {string | void} countryName - The country name to avoid in the random selection.
   * @returns {void}
   */
  const getThreeRandomCountryNames = (countryName: string | void): void => {
    const threeRandomCountries: Country[] = [];
    // Generate three random countries, avoiding duplicates and the provided country name
    for (let i = 0; i < 3; i += 1) {
      let randomCountryData: Country;
      do {
        randomCountryData =
          quizData[Math.floor(Math.random() * quizData.length)];
      } while (
        threeRandomCountries.some(
          (country) => country.name.common === randomCountryData.name.common
        ) ||
        randomCountryData.name.common === countryName
      );

      threeRandomCountries.push(randomCountryData);
    }
    // Extract the names of the three random countries and the provided country name
    const getNames = threeRandomCountries?.map(
      (country) => country.name.common
    );
    // Add the name of the current country
    getNames.push(countryName!);

    // Shuffle the country names and set them as the name options
    const shuffledCountryNames = shuffleArray(getNames);
    dispatch(setNameOptions(shuffledCountryNames));
  };

  /**
   * Shuffles an array using the Fisher-Yates shuffle algorithm.
   * @param {string[]} array - The input array to shuffle.
   * @returns {string[]} - The shuffled array.
   */
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

  /**
   * Checks user's answer.
   * Awards a point for correct answer and progresses to the next question.
   * Proceeds to the next question without awarding points for incorrect answer.
   * @param {string} userAnswer - The answer provided by the user.
   * @returns {Promise<void>}
   */
  const checkAnswer = async (userAnswer: string): Promise<void> => {
    try {
      // Check if the user's answer is correct
      const isCorrect = userAnswer === currentCountry.name.common;

      if (isCorrect) {
        // Award a point if correct
        dispatch(setUserPoints(userPoints + 1));
      }

      // Proceed to the next flag
      await goToNextFlag();
    } catch (error) {
      // Handle errors
      console.error('An error occurred while checking the answer:', error);
    }
  };

  /**
   * Progresses to the next question, updates options and timer.
   * @returns {Promise<void>}
   */
  const goToNextFlag = async (): Promise<void> => {
    try {
      // Get the name of the next country
      const currCountryName = getCurrentCountry();

      if (currCountryName === void 0) {
        // All countries were answered, handle the game completion
        dispatch(finishGame());
      } else {
        // Update options and timer
        getThreeRandomCountryNames(currCountryName);
        dispatch(setTimer(10));
      }
    } catch (error) {
      // Handle errors
      console.error(
        'An error occurred while progressing to the next question:',
        error
      );
    }
  };

  /**
   * Handles the quit button click event.
   * Finishes the game, after a delay, resets the game state
   * to indicate it's not finished to return the user to the welcome screen.
   * @returns {void}
   */
  const handleQuitBtn = (): void => {
    dispatch(finishGame());
    setTimeout(() => {
      dispatch(setIsGameFinished(false));
    }, 3000);
  };

  return {
    startGame,
    fetchGameData,
    checkAnswer,
    handleQuitBtn,
  };
};
