export interface IGameControlState {
  quizData: Country[];
  answered: Country[];
  nameOptions: string[];
  isGameRunning: boolean;
  isGameFinished: boolean;
  currentCountry: Country;
  currentAnswer: string;
  userPoints: number;
  pointsHistory: string[];
  timer: number;
}

export type Country = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      fra: {
        official: string;
        common: string;
      };
    };
  };
};
