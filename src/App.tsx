import { FormEvent, useRef, useState } from 'react'
import { calculateEpoch, calculateRandomSynapses, synapseType } from './training/functions'
import { trainingSets } from './training/trainingSets'
import './App.css'

function App() {
  const [error, setError] = useState(false)
  
  const [synapses, setSynapses] = useState<synapseType>(
    {
      bias: 1,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  )

  const refForm = useRef({
    stopCondition: 0.5,
    maxEpochs: 10,
    initialSynapse: synapses,
  })

  const synapseString = `bias: ${synapses.bias}, data: ${synapses.data}`

  const onChangeForm = (event: FormEvent) => {
    const target = event.target as HTMLInputElement
    const targetName = target.name
    const numTarget = parseFloat(target.value)

    if(isNaN(numTarget)) {
      setError(true)
      return
    }
    
    if(targetName === "stopCondition")
      if(numTarget <= 0 || numTarget >= 1) {
        setError(true)
        return
      }

    if(targetName === "maxEpochs")
      if(numTarget <= 0 || numTarget >= 10000) {
        setError(true)
        return
      }

    setError(false)

    refForm.current = {
      ...refForm.current,
      [targetName]: numTarget
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    trainPerceptron()
  };

  const randomizeSynapse = () => {
    const newSynapses = calculateRandomSynapses(9)

    setSynapses(newSynapses)
    refForm.current.initialSynapse = newSynapses
  }

  const trainPerceptron = () => {
    const currentTrainingSets = [...trainingSets]
    const initialSynapse = refForm.current.initialSynapse
    const stopCondition = refForm.current.stopCondition
    const maxEpochs = refForm.current.maxEpochs

    console.log(refForm.current)

    const output = calculateEpoch(
      currentTrainingSets,
      initialSynapse,
      stopCondition,
      maxEpochs
    )

    console.log(output)
  }

  const testPerceptron = () => {
    console.log("testando...")
  }

  return (
    <>
      <h1>Neurônio Perceptron</h1>
      <h2>Reconhecimento do dígito 1</h2>
      <form className='trainingForm' onSubmit={handleSubmit} onChange={onChangeForm}>
        <label htmlFor="stopCondition">Condição de parada (entre 0 e 1)</label>
        <input name="stopCondition" id="stopCondition" defaultValue={0.5} placeholder="ex.: 0.00001" />
        <label htmlFor="maxEpochs">Máximo de épocas (entre 1 e 10000)</label>
        <input name="maxEpochs" id="maxEpochs" defaultValue={10} />
        <label htmlFor="initialSynapse">Sinapse inicial</label>
        <input type="text" name='initialSynapse' id='initialSynapse' disabled value={synapseString}/>
        <button type='button' onClick={randomizeSynapse}>Randomizar synapse</button>
        ----
        <button type="submit" disabled={error}>Treinar</button>
      </form>
    </>
  )
}

export default App
