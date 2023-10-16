import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, IGameControlState } from './types/gameControlTypes';

const initialState: IGameControlState = {
  quizData: [],
  answered: [],
  nameOptions: [],
  isGameRunning: false,
  isGameFinished: true,
  currentCountry: {
    flags: {
      png: '',
      svg: '',
      alt: '',
    },
    name: {
      common: '',
      official: '',
      nativeName: {
        fra: {
          official: '',
          common: '',
        },
      },
    },
  },
  currentAnswer: '',
  userPoints: 0,
  pointsHistory: [],
  timer: 10,
};

const rtkSlice = createSlice({
  name: 'gameControlSlice',
  initialState,
  reducers: {
    setQuizData(state, action: PayloadAction<Country[]>) {
      state.quizData = action.payload;
    },
    setAnswered(state, action: PayloadAction<Country>) {
      state.answered.push(action.payload);
    },
    setNameOptions(state, action: PayloadAction<string[]>) {
      state.nameOptions = action.payload;
    },
    setIsGameRunning(state, action: PayloadAction<boolean>) {
      state.isGameRunning = action.payload;
    },
    setIsGameFinished(state, action: PayloadAction<boolean>) {
      state.isGameFinished = action.payload;
    },
    setCurrentCountry(state, action: PayloadAction<Country>) {
      state.currentCountry = action.payload;
    },
    setCurrentAnswer(state, action: PayloadAction<string>) {
      state.currentAnswer = action.payload;
    },
    setUserPoints(state, action: PayloadAction<number>) {
      state.userPoints = action.payload;
    },
    setPointsHistory(state, action: PayloadAction<number>) {
      state.pointsHistory.push(
        `${action.payload}, ${new Date().toDateString()}`
      );
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    restartGame(state) {
      state.currentCountry = {
        flags: {
          png: '',
          svg: '',
          alt: '',
        },
        name: {
          common: '',
          official: '',
          nativeName: {
            fra: {
              official: '',
              common: '',
            },
          },
        },
      };
      state.answered = [];
      state.userPoints = 0;
      state.isGameRunning = true;
      state.isGameFinished = false;
    },
  },
});

export default rtkSlice.reducer;
export const {
  setQuizData,
  setAnswered,
  setNameOptions,
  setIsGameRunning,
  setIsGameFinished,
  setCurrentCountry,
  setCurrentAnswer,
  setUserPoints,
  setPointsHistory,
  setTimer,
  restartGame,
} = rtkSlice.actions;
