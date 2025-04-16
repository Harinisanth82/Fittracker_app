import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from './TextInput';
import  Button  from './Button';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ExampleBox = styled.div`
  font-size: 12px;
  color: #666;
  background: #f4f4f4;
  padding: ${({ $expanded }) => ($expanded ? "10px 12px" : "0")};
  border-radius: 8px;
  line-height: 20px;
  white-space: pre-line;
  font-family: monospace;
  margin-bottom: ${({ $expanded }) => ($expanded ? "6px" : "0")};
  max-height: ${({ $expanded }) => ($expanded ? "200px" : "0")};
  opacity: ${({ $expanded }) => ($expanded ? "1" : "0")};
  overflow: hidden;
  transition: all 0.4s ease;
`;
const Example = styled.div`
font-size: 14px;
font-weight: 500;
color: ${({ theme }) => theme.primary};
transition: color 0.3s ease;

&:hover {
  color: ${({ theme }) => theme.text_secondary};
}
`;

const AddWorkout = ({workout,setWorkout,addNewWorkout,buttonLoading}) => {
  const [showExample, setShowExample] = useState(false);
  return (
    <Card>
        
        <Title>Add New Workout</Title>
        <ToggleRow onClick={() => setShowExample(!showExample)}>
        <Example>Example</Example>
    {showExample ? (
      <KeyboardArrowUp style={{ fontSize: "22px" }} />
    ) : (
      <KeyboardArrowDown style={{ fontSize: "22px" }} />
    )}
  </ToggleRow>

  <ExampleBox $expanded={showExample}> 
    #legs{"\n"}Back Squat{"\n"}5(sets)X 15(reps){"\n"}30(Kg){"\n"}10(min) 
    {"\n(Inside Brackets are Example Purpouse Only)"}
</ExampleBox>
        <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:
#Category
Workout Name
Sets X Reps
Weight (kg)
Duration (min)`}
          
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button text="Add Workout"
      $small
      onClick={()=>addNewWorkout()}
        $isLoading={buttonLoading}
        $isDisabled={buttonLoading}
      />
    </Card>
  )
}

export default AddWorkout