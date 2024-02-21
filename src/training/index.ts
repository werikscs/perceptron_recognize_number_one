import {
  trainingSetType,
  synapseType,
  calculateRandomSynapses,
  calculateEpoch,
  testPerceptron,
} from "./functions";

const trainingSets: trainingSetType[] = [
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

const initialSynapse: synapseType = calculateRandomSynapses(9);
const stopCondition = 0.1;
const maxEpochs = 1000;

console.log("Initial Synapses: ", initialSynapse);
console.log("Initial Training Sets: ", trainingSets);

const finalSynapses = calculateEpoch(
  trainingSets,
  initialSynapse,
  stopCondition,
  maxEpochs
);

console.log("Final Synapses: ", finalSynapses);

const inputData: trainingSetType = {
  bias: 1,
  inputData: [0, 1, 0, 1, 1, 0, 0, 1, 0],
  desiredOutput: 1,
};

const output = testPerceptron(inputData, finalSynapses);
console.log("Output: ", output);
