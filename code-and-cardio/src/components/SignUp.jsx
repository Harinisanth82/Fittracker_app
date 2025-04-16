import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import  Button  from './Button';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux/reducers/userSlice";
import { userSignup } from '../api';


const Container=styled.div`
    width:100%;
    max-width:500px;
    display:flex;
    flex-direction:column;
    gap:36px;`;

const Title=styled.div`
    font-size:30px;
    font-weight:800;
    color:${({theme})=>theme.text_primary};`;

const Span=styled.div`
    font-size:16px;
    font-weight:400;
    color:${({theme})=>theme.text_secondary+90};`;

const SignUp = () => {
    
    const dispatch=useDispatch();
    const[loading,setLoading]=useState(false);
    const[buttonDisabled,setButtonDisabled]=useState(false);
    const[name,setName]=useState("")
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const validateinputs=()=>{
        if(!name||!email||!password){
            alert("Please Fill in All Feilds");
            return false;
        }
        return true;
      }
    
    const handelSignUp=async()=>{
    setLoading(true);
    setButtonDisabled(true);
    if(validateinputs()){
            userSignup({name,email,password}).then((res)=>{
            dispatch(loginSuccess(res.data));
            alert("Account Created Sucessfully");
            setLoading(false);
            setButtonDisabled(false);
        }).catch((err)=>{
            alert(err.response.data.message);
            setLoading(false);
            setButtonDisabled(false);
        })
    }
    }
  return (
    <Container>
        <div>
            <Title>Create New Account 👋</Title>
            <Span>Please enter details to create a new account</Span>
        </div>
        <div style={{
            display:"flex",
            gap: "20px",
            flexDirection:"column"
        }}>
            <TextInput label="Email Adress" 
            placeholder="Enter Your Email adress"
            value={email}
            handelChange={(e)=>setEmail(e.target.value)}/>

            <TextInput label="Full Name" 
            placeholder="Enter Your Full Name"
            value={name}
            handelChange={(e)=>setName(e.target.value)}/>

            <TextInput label="Password" 
            placeholder="Enter Your Password"
            password
            value={password}
            handelChange={(e)=>setPassword(e.target.value)}/>
            
            <Button text="SignUp"
            onClick={handelSignUp}
            isLoading={loading}
            isDisabled={buttonDisabled}/>
        </div>
    </Container>
  )
}

export default SignUp