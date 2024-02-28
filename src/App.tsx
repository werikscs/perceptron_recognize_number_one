import { FormEvent, useRef, useState } from 'react'
import { calculateEpoch, calculateEpochOutputType, calculateRandomSynapses, synapseType, testPerceptron, trainingSetType } from './training/functions'
import { trainingSets } from './training/trainingSets'
import './App.css'

function App() {
  const [trainingError, setTrainingError] = useState(false)
  const [testingError, setTestingError] = useState(true)
  
  const [synapses, setSynapses] = useState<synapseType>(
    {
      bias: 1,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  )

  const [trainingOutput, setTrainingOutput] = useState<calculateEpochOutputType>()
  const [testingOutput, setTestingOutput] = useState<boolean>()

  const refTrainingForm = useRef({
    stopCondition: 0.5,
    maxEpochs: 10,
    initialSynapse: synapses,
  })

  const refTestingForm = useRef({
    inputData: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  })

  const synapseString = `bias: ${synapses.bias}, data: ${synapses.data}`

  const onChangeTrainingForm = (event: FormEvent) => {
    const target = event.target as HTMLInputElement
    const targetName = target.name
    const numTarget = parseFloat(target.value)

    if(isNaN(numTarget)) {
      setTrainingError(true)
      return
    }
    
    if(targetName === "stopCondition")
      if(numTarget <= 0 || numTarget >= 1) {
        setTrainingError(true)
        return
      }

    if(targetName === "maxEpochs")
      if(numTarget <= 0 || numTarget >= 10000) {
        setTrainingError(true)
        return
      }

    setTrainingError(false)

    refTrainingForm.current = {
      ...refTrainingForm.current,
      [targetName]: numTarget
    }
  }

  const handleSubmitTraining = (event: FormEvent) => {
    event.preventDefault();

    trainPerceptron()
  };

  const randomizeSynapse = () => {
    const newSynapses = calculateRandomSynapses(9)

    setSynapses(newSynapses)
    refTrainingForm.current.initialSynapse = newSynapses
  }

  const onChangeTestingForm = (event: FormEvent) => {
    const target = event.target as HTMLInputElement
    const strToArr = target.value.split(',')

    if(strToArr.length !== 9) {
      setTestingError(true)
      return
    }


    if(strToArr.some(value => {
      const numValue = parseFloat(value)
      return isNaN(numValue) || numValue < 0 || numValue > 1
    })) {
      setTestingError(true)
      return
    }

    setTestingError(false)

    refTestingForm.current = {
      ...refTestingForm.current,
      inputData: strToArr.map(value => parseFloat(value))
    }
  }

  const trainPerceptron = () => {
    const currentTrainingSets = [...trainingSets]
    const initialSynapse = refTrainingForm.current.initialSynapse
    const stopCondition = refTrainingForm.current.stopCondition
    const maxEpochs = refTrainingForm.current.maxEpochs

    console.log(refTrainingForm.current)

    const output = calculateEpoch(
      currentTrainingSets,
      initialSynapse,
      stopCondition,
      maxEpochs
    )

    console.log(output)

    setTrainingOutput(output)
  }

  const handleSubmitTestPerceptron = (event: FormEvent) => {
    event.preventDefault()

    const inputData: trainingSetType = {
      bias: 1,
      inputData: refTestingForm.current.inputData,
      desiredOutput: 1
    }
    const trainedSynapses: synapseType = trainingOutput!.finalSynapses
    const output = testPerceptron(inputData, trainedSynapses)

    console.log(output)
    
    setTestingOutput(Boolean(output))
  }

  return (
    <>
      <h1>Neurônio Perceptron</h1>
      <h2>Reconhecimento do dígito 1</h2>
      <form className='trainingForm' onSubmit={handleSubmitTraining} onChange={onChangeTrainingForm}>
        <label htmlFor="stopCondition">Condição de parada (entre 0 e 1)</label>
        <input name="stopCondition" id="stopCondition" defaultValue={0.5} placeholder="ex.: 0.00001" />
        <label htmlFor="maxEpochs">Máximo de épocas (entre 1 e 10000)</label>
        <input name="maxEpochs" id="maxEpochs" defaultValue={10} />
        <label htmlFor="initialSynapse">Sinapse inicial</label>
        <input type="text" name='initialSynapse' id='initialSynapse' disabled value={synapseString}/>
        <button type='button' onClick={randomizeSynapse}>Randomizar synapse</button>
        <button type="submit" disabled={trainingError}>Treinar</button>
      </form>
      {trainingOutput && (
        <>
          <div className='trainingResult'>
            <h2>Resultado do Treinamento</h2>
            <p className='trainedError'>Erro médio: {trainingOutput.finalAverageEpochError}</p>
            <p className='trainedBias'>Bias: {trainingOutput.finalSynapses.bias}</p>
            <p className='trainedSynapses'>Sinapses
              {
                trainingOutput.finalSynapses.data.map((synapse, index) => (
                  <span key={index}>{synapse}</span>
                ))
              }
            </p>
          </div>
          <h2>Testar Perceptron</h2>
          <form className='testingForm' onSubmit={handleSubmitTestPerceptron} onChange={onChangeTestingForm}>
            <label htmlFor="inputData">Entrada</label>
            <input name="inputData" id="inputData" placeholder='ex.: 1,1,1,0,0,0,1,1,1'/>
            <button type="submit" disabled={testingError}>Testar</button>
          </form>
          <div className='testingResult'>
            {testingOutput !== undefined && (
              <>
                <h2>Resultado do Teste</h2>
                <p>{testingOutput ? 'O perceptron reconheceu o dígito 1' : 'O perceptron não reconheceu o dígito 1'}</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default App
