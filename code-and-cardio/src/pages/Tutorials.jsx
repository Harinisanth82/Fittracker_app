import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { MonitorWeightRounded, FitnessCenterRounded, WaterDropRounded } from '@mui/icons-material'

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0;
  overflow-y: auto;
`
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 16px;
`
const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  padding: 0 16px;
`
const Card = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};
  border-radius: 14px;
  box-shadow: 1px 6px 20px ${({ theme }) => theme.primary + '15'};
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;
`
const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }
`
const ResultCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.green + '20'};
  text-align: center;
`
const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`
const Tab = styled.div`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $active, theme }) => $active ? theme.primary : theme.text_secondary + '10'};
  color: ${({ $active, theme }) => $active ? theme.white : theme.text_primary};
`

const BMICalculator = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calculate = () => {
    const h = height / 100
    const b = (weight / (h * h)).toFixed(1)
    setBmi(b)
    setCategory(
      b < 18.5 ? 'Underweight' :
      b < 25 ? 'Normal' :
      b < 30 ? 'Overweight' : 'Obese'
    )
  }
  return (
    <Card>
      <h3>BMI Calculator</h3>
      <InputGroup>
        <Label><MonitorWeightRounded fontSize="small" /> Height (cm)</Label>
        <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder='Enter Your Height'/>
      </InputGroup>
      <InputGroup>
        <Label><FitnessCenterRounded fontSize="small" /> Weight (kg)</Label>
        <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Enter Your Weight'/>
      </InputGroup>
      <Button text="Calculate BMI" onClick={calculate} isDisabled={!height || !weight} />
      {bmi && (
        <ResultCard>
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {category}</p>
        </ResultCard>
      )}
    </Card>
  )
}

const HydrationCalculator = () => {
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    setResult(Math.round(weight * 33))
  }

  return (
    <Card>
      <h3>Hydration Calculator</h3>
      <InputGroup>
        <Label><WaterDropRounded fontSize="small" /> Weight (kg)</Label>
        <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Enter Your Weight' />
      </InputGroup>
      <Button text="Calculate Water Intake" onClick={calculate} isDisabled={!weight} />
      {result && (
        <ResultCard>
          <h3>Water Intake</h3>
          <p>{result} ml/day (~{Math.round(result/240)} cups)</p>
        </ResultCard>
      )}
    </Card>
  )
}

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState('bmi')

  return (
    <Container>
      <Wrapper>
        <Title>Health Vitals</Title>
        <Tabs>
          <Tab $active={activeTab === 'bmi'} onClick={() => setActiveTab('bmi')}>BMI</Tab>
          <Tab $active={activeTab === 'hydration'} onClick={() => setActiveTab('hydration')}>Hydration</Tab>
        </Tabs>
        {activeTab === 'bmi' && <BMICalculator />}
        {activeTab === 'hydration' && <HydrationCalculator />}
      </Wrapper>
    </Container>
  )
}

export default Tutorials
