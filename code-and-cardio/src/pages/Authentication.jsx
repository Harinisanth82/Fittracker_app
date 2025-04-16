import React, { useState } from 'react'
import styled from "styled-components"
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const Container=styled.div`
    flex:1;
    height:100%;
    display:flex;
    background:${({theme})=>theme.bg};
    @media(max-width:700px){
        flex-direction:column;}
    `;
const Left=styled.div`
    flex:1;
    background:blue;
    @media(max-width:700px){
        display:none;}
    `;
const Right=styled.div`
    flex:1;
    position:relative;
    display:flex;
    flex-direction:column;
    padding:40px;
    gap:16px;
    align-items:center;
    justify-content:center;
    `;
const Logo = styled.div`
    background-image: url(${LogoImage});
    background-size: contain;
    background-repeat: no-repeat;
    width: 70px;
    height: 70px;
    position: absolute;
    top: 40px;
    left: 60px;
    z-index: 10;
`;

const Image = styled.div`
    background-image: url(${AuthImage});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
`;
const Text=styled.div`
    font-size:16px;
    text-align:center;
    color:${({theme})=>theme.text_secondary}
    margin-top:16px;
    @media(max-width:700px){
        font-size:14px;
    }`;
const TextButton=styled.span`
    color:${({theme})=>theme.primary};
    cursor:pointer;
    transition:all 0.3s ease;
    font-weight:600;`;

const Authentication = () => {
    const[login,setLogin]=useState(true);
  return (
    <Container>
        <Left>
            <Logo/>
            <Image/>
        </Left>
        <Right>
            {login ?(
            <>
            <SignIn/>
            <Text style={{ marginTop:"20px"}}>Don't have an account ? {" "} <TextButton onClick={()=>setLogin(false)}>SignUp</TextButton></Text>
            </>):(
            <>
            <SignUp/>
            <Text style={{ marginTop:"20px"}}>Already have an account ? {" "} <TextButton onClick={()=>setLogin(true)}>SignIn</TextButton></Text>
            </>)
            }
        </Right>
    </Container>
  )
}

export default Authentication