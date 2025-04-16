import React, { useState } from 'react'
import styled from 'styled-components'
import { Link as LinkR, NavLink} from 'react-router-dom';
import Logoo from '../utils/Images/Logo.png';
import { MenuRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userSlice';

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo=styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({theme}) =>theme.black};
`;
const Logo = styled.img`
  height: 42px;
`;
const Mobileicon=styled.div`
    color:${({theme})=>theme.text_primary};
    display:none;
    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
    };`;
    const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 0 6px;
    list-style: none;
    @media screen and (max-width: 768px) {
      display: none;
    }
  `;
const Navlink=styled(NavLink)`
    display:flex;
    align-items:center;
    color:${({theme})=>theme.text_primary};
    font_weight:500;
    cursor:pointer;
    transition:all 1s slide-in;
    text-decoration:none;
    &:hover{
        color:${({theme})=>theme.primary}};
    &.active {
        color: ${({ theme }) => theme.primary};
        border-bottom: 1.8px solid ${({ theme }) => theme.primary};
    };`;

const UserContainer=styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:flex-end;
  gap:16px;
  align-items:center;
  padding:0 6px;
  color:${({theme})=>theme.primary};`;

const TextButton=styled.div`
  text-align:end;
  color:${({theme})=>theme.secondary};
  cursor:pointer;
  font-size:16px;
  transition:all 0.3s ease;
  font-weight:600;
  &:hover{
        color:${({theme})=>theme.primary}};`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 2rem 0;
  list-style: none;
  width: 100%;
  position: fixed;
  top: 80px;
  left: 0;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  z-index: 999;
  transition: all 0.6s ease-in-out;
  transform: ${({ $isOpen }) => 
  $isOpen ? "translateY(0)" : "translateY(-150%)"};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  @media (min-width: 769px) {
    display: none;
  }
`;
  
const getInitial = (name) => {
  if (!name || typeof name !== 'string') return 'U';
    const firstChar = name.charAt(0).toUpperCase();
    return /[A-Z]/.test(firstChar) ? firstChar : 'U';
};

const NavBar = ({currentUser}) => {
  const dispatch=useDispatch()
  const [isOpen,setisOpen]=useState(false);
  return (
    <Nav>
        <NavContainer>
            <Mobileicon onClick={()=>setisOpen(!isOpen)}>
                <MenuRounded sx={{color:'inherit'}}/>
            </Mobileicon>
            <NavLogo to="/">
                <Logo src={Logoo}/>
                  Fittrack
            </NavLogo>
            <MobileMenu $isOpen={isOpen}>
                <Navlink to="/">DashBoard</Navlink>
                <Navlink to="/workouts">Workouts</Navlink>
                <Navlink to="/tutorials">CheckUp</Navlink>
                <Navlink to="/contact">Contact</Navlink>
            </MobileMenu>
            <NavItems>
                <Navlink to="/">DashBoard</Navlink>
                <Navlink to="/workouts">Workouts</Navlink>
                <Navlink to="/tutorials">CheckUp</Navlink>
                <Navlink to="/contact">Contact</Navlink>
            </NavItems>
            <UserContainer>
            <Avatar>
            {currentUser?.name ? getInitial(currentUser.name) : 'U'}
            </Avatar>
                <TextButton onClick={()=>dispatch(logout())}>Logout</TextButton>
            </UserContainer>
        </NavContainer>
    </Nav>
  )
}

export default NavBar