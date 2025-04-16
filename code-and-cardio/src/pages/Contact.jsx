
import { MailRounded, Message, Person2Rounded} from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'

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
const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }
`;

const StyledButton = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 26px;
  box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 40};
  border: 1px solid ${({ theme }) => theme.primary};
  
  background: ${({ theme, type }) =>
    type === "secondary" ? theme.secondary : theme.primary};
  border: 1px solid ${({ theme, type }) =>
    type === "secondary" ? theme.secondary : theme.primary};

  &:hover {
    background: ${({ theme, type }) =>
      type === "secondary" ? theme.secondaryHover : theme.primaryHover};
    box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 60};
  }

  &:active {
    background: ${({ theme, type }) =>
      type === "secondary" ? theme.secondaryActive : theme.primaryActive};
    box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 80};
  }
`;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "9581669c-d335-4225-ad81-bd4b9e21bd0f");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title:"Success!",
        text:"Message sent successfully!",
        icon:"success",
        confirmButtonColor: "#007bff"
    })
    setIsSubmitting(false);
  }};
  return (
    <Container>
      <Wrapper>
        <Title>Contact Me</Title>
        <Card as="form" onSubmit={onSubmit}>
          <InputGroup>
            <Label><Person2Rounded/> Full Name</Label>
            <Input type='text'
                   placeholder="Enter your name"
                   name='name'
                   required />
          </InputGroup>
          <InputGroup>
            <Label><MailRounded/>Email</Label>
            <Input type='email'
                   placeholder="Enter your Email" 
                   name='email'
                   required/>
          </InputGroup>
          <InputGroup>
            <Label><Message/> Message</Label>
            <TextArea
  placeholder="Provide Your Message"
  name="message"
  rows="4"
/>
          </InputGroup>
          <StyledButton type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</StyledButton>

        </Card>
      </Wrapper>
    </Container>
  )
}


export default Contact