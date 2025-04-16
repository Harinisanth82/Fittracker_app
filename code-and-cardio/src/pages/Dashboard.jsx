import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { counts } from '../utils/data';
import CountCards from '../components/cards/CountCards';
import WeeklyStart from '../components/cards/WeeklyStart';
import CatogeryChart from '../components/cards/CatogeryChart';
import AddWorkout from '../components/AddWorkout';
import WorkoutCard from '../components/cards/WorkoutCard';
import { getDashboardDetails,addWorkout,getWorkouts } from '../api';
import { workoutGifs } from '../utils/Gif/gifs';

const Container = styled.div`
  flex: 1;
  height: 100vh;  
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: auto;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Dashboard = () => {
  
  const[loading,setLoading]=useState(false);
  const[data,setData]=useState();
  const[buttonLoading,setButtonLoading]=useState(false);
  const[todaysWorkouts,setTodaysWorkouts]=useState([]);
  const [workout, setWorkout] = useState("");
    

  const dashboardData=async()=>{
    setLoading(true);
    const token=localStorage.getItem("fittrack-app-token")
    await getDashboardDetails(token).then((res)=>{
      setData(res.data);
      setLoading(false);
    })
  }
  const getTodaysWorkout=async()=>{
    setLoading(true);
    const token=localStorage.getItem("fittrack-app-token");
    await getWorkouts(token,"").then((res)=>{
      setTodaysWorkouts(res?.data?.todaysWorkouts)
      setLoading(false);
  })}

  const addNewWorkout=async()=>{
    setButtonLoading(true);
    const token=localStorage.getItem("fittrack-app-token");
    await addWorkout(token,{workoutString:workout}).then(()=>{
      dashboardData();
      getTodaysWorkout();
      setButtonLoading(false);
    }).catch((err) => {
      alert(err.response?.data?.message || "Failed to add workout");
      setButtonLoading(false);
    })
  }

  useEffect(()=>{
    dashboardData();
    getTodaysWorkout();
  },[])
  
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
              <CountCards key={item.id} item={item} data={data} />
            ))}
        </FlexWrap>
        <FlexWrap>
            <WeeklyStart data={data} />
            <CatogeryChart data={data} />
            <AddWorkout
              workout={workout}
              setWorkout={setWorkout}
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
            />
         </FlexWrap>

        <Section>
            <Title>Today'S Workout</Title>
            <CardWrapper>
                {todaysWorkouts.map((workout, index) => (
                  <WorkoutCard 
                      key={`workout-${index}-${workout.date || Date.now()}`} 
                      workout={workout} 
                  />
                ))}
                {!loading && todaysWorkouts.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      style={{ maxWidth: '300px', borderRadius: '8px' }}
                    >
                    <source src={
                    workoutGifs[1]} type="video/mp4" />
                    </video>
                    <p style={{ marginTop: '8px' }}>No workouts today</p>
                    </div>
)}
            </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  )
}

export default Dashboard