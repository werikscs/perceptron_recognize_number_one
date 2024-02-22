import { trainingSetType } from "./functions";

export const trainingSets: trainingSetType[] = [
  {
    bias: 1,
    inputData: [0, 1, 0, 0, 1, 0, 0, 1, 0],
    desiredOutput: 1,
  },
  {
    bias: 1,
    inputData: [1, 1, 0, 0, 1, 0, 0, 1, 0],
    desiredOutput: 1,
  },
  {
    bias: 1,
    inputData: [0, 1, 0, 0, 1, 0, 1, 1, 1],
    desiredOutput: 1,
  },
  {
    bias: 1,
    inputData: [0, 1, 0, 1, 1, 0, 0, 1, 0],
    desiredOutput: 1,
  },
  {
    bias: 1,
    inputData: [1, 1, 0, 0, 1, 0, 1, 1, 1],
    desiredOutput: 1,
  },
  {
    bias: 1,
    inputData: [1, 1, 1, 1, 0, 1, 1, 1, 1],
    desiredOutput: 0,
  },
  {
    bias: 1,
    inputData: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    desiredOutput: 0,
  },
  {
    bias: 1,
    inputData: [1, 1, 0, 1, 1, 0, 0, 1, 0],
    desiredOutput: 0,
  },
];
