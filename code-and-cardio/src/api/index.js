import axios from "axios";

const API=axios.create({
    baseURL: "http://localhost:8080/api",
});
export const userSignup=async(data)=>API.post("/user/signup",data);
export const userSignin=async(data)=>API.post("/user/signin",data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });


  export const getWorkouts = async (token, date) =>
    await API.get(`/user/workout${date ? `?date=${date}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
export const addWorkout = async (token, data) =>
    API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
});
      