import { ThemeProvider, styled } from "styled-components"
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import NavBar from "./components/NavBar";
import  Dashboard  from "./pages/Dashboard";
import Tutorials from "./pages/Tutorials";
import Contact from "./pages/Contact";
import Workouts from "./pages/Workouts";
import { useSelector } from "react-redux";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
`;
  
function App() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          {currentUser?(
            <Container>
              <NavBar currentUser={currentUser}/>
              <Routes>
                <Route path="/" exact element={<Dashboard/>}/>
                <Route path="/Workouts" exact element={<Workouts/>}/>
                <Route path="/Tutorials" exact element={<Tutorials/>}/>
                <Route path="/Contact" exact element={<Contact/>}/>
              </Routes>
            </Container>
          ):(
          <Container>
             <Authentication/>
          </Container>)}
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
