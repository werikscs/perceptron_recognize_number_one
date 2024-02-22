export type trainingSetType = {
  bias: number;
  inputData: number[];
  desiredOutput: number;
};

export type synapseType = {
  bias: number;
  data: number[];
};

export const calculateRandomSynapses = (
  synapsesLength: number
): synapseType => {
  const synapses: synapseType = {
    bias: 1,
    data: [],
  };

  for (let i = 0; i < synapsesLength; i++) {
    const synapseValue = Math.random() >= 0.5 ? 1 : 0;
    synapses.data.push(synapseValue);
  }

  return synapses;
};

export const calculateV = (
  trainingSet: trainingSetType,
  synapses: synapseType
): number => {
  let v = 0;

  trainingSet.inputData.forEach((value, index) => {
    if (index === 0) v = trainingSet.bias * synapses.bias;
    v += value * synapses.data[index];
  });

  return v;
};

export const calculateOutput = (v: number): number => {
  const activationFunction = (v: number): number => {
    return v > 0 ? 1 : 0;
  };
  return activationFunction(v);
};

export const calculateDeltaW = (
  constantOfProportionality: number,
  error: number,
  trainingSet: trainingSetType
): synapseType => {
  const deltaW = { bias: trainingSet.bias, data: trainingSet.inputData };

  trainingSet.inputData.forEach((value, index) => {
    if (index === 0) deltaW.bias = constantOfProportionality * error * value;
    deltaW.data[index] = constantOfProportionality * error * value;
  });

  return deltaW;
};

export const updateSynapses = (
  currentSynapses: synapseType,
  deltaW: synapseType
): synapseType => {
  const updatedSynapses: synapseType = {
    bias: 0,
    data: [],
  };

  updatedSynapses.bias = currentSynapses.bias + deltaW.bias;

  currentSynapses.data.forEach((value, index) => {
    updatedSynapses.data[index] = value + deltaW.data[index];
  });

  return updatedSynapses;
};

type calculateEpochOutputType = {
  finalSynapses: synapseType,
  finalAverageEpochError: number
}

export const calculateEpoch = (
  trainingSets: trainingSetType[],
  initialSynapse: synapseType,
  stopCondition: number,
  maxEpochs: number
): calculateEpochOutputType => {
  const epochError = 1;
  let epochCounter = 1;
  let currentSynapses = {...initialSynapse};
  let finalAverageEpochError = 0;

  console.log(currentSynapses)

  while (epochCounter <= maxEpochs && epochError > stopCondition) {
    console.log(`============EPOCH ${epochCounter}============\n`);

    const epochErrors: number[] = [];

    trainingSets.forEach((currentTrainingSet) => {
      const vXn = calculateV(currentTrainingSet, currentSynapses);
      const calculatedOutput = calculateOutput(vXn);

      const error = currentTrainingSet.desiredOutput - calculatedOutput;
      epochErrors.push(error);

      const constantOfProportionality = 0.5;
      const deltaW = calculateDeltaW(
        constantOfProportionality,
        error,
        currentTrainingSet
      );

      const updatedSynapes = updateSynapses(currentSynapses, deltaW);
      currentSynapses = updatedSynapes;
    });

    const sumOfEpochErrors = epochErrors.reduce(
      (acc, value) => acc + value * value,
      0
    );
    const averageEpochError = sumOfEpochErrors / trainingSets.length;
    finalAverageEpochError = averageEpochError;

    epochCounter += 1;

    console.log("Epoch Errors: ", epochErrors);
    console.log("Average Epoch Errors: ", averageEpochError);
    console.log("\n");
  }

  return { finalSynapses: currentSynapses, finalAverageEpochError };
};

export const testPerceptron = (
  inputData: trainingSetType,
  synapses: synapseType
): number => {
  const v = calculateV(inputData, synapses);
  const output = calculateOutput(v);
  return output;
};
