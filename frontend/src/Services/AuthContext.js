import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [seekerId, setSeekerId] = useState('');
  const [recruiterId, setRecruiterId] = useState('');


  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);

  }, [isAuthenticated]);



  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_JOB_API_URL}/users/token/obtain/`, {
        email,
        password
      });
  
      const { refresh, access } = response.data;
  
      setIsAuthenticated(true);
      setRefreshToken(refresh);
      setAccessToken(access);
      console.log("refresh token is " + refresh);
      console.log("access token is " + access);
  
      setError('');

      let userId
  
      if (refresh) {
        const decodedToken = jwt_decode(refresh);
        console.log("decoded",decodedToken);
        userId = decodedToken.user_id; // Assuming the user ID is stored in the 'user_id' claim
        console.log('User ID:', userId);
        // Use the user ID as needed
        setUserId(userId)
        localStorage.setItem('userId', userId);        
      }
      if(userId){
        const seekerResponse = await axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/seeker/${userId}/`);
        console.log("seeeeeekr", seekerResponse.data ); 
      if(seekerResponse.data.length > 0){
        console.log("Seeker Logged In Successfully");
        setSeekerId(seekerResponse.data[0].id)
        localStorage.setItem('seekerId', seekerResponse.data[0].id);
        navigate('/jobs');

      }

      else {
        // User is a recruiter
        console.log("Recruiter Logged In Successfully");
        navigate('/recruiter');
        const recruiterResponse = await axios.get(`${process.env.REACT_APP_JOB_API_URL}/users/api/recruiter/${userId}/`);
        setRecruiterId(recruiterResponse.data[0].id);
        console.log(recruiterResponse.data[0].id)
        localStorage.setItem('recruiterId', recruiterResponse.data[0].id);
        // Redirect to the recruiter page
        console.log('locaaaaaaaaaaaaaaaaaaaaaaaaaaal',localStorage.getItem('recruiterId'));
        localStorage.setItem('isAuthenticated', true.toString());
        console.log( 'Scoooooooooooooooooooooooooot' ,localStorage.getItem('isAuthenticated') );
      }
    }
      // else for recruiter



      
    } catch (error) {
      if (error.response.status === 401)
      alert('Invalid email or password.');
    } 
    
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRefreshToken(null);
    setAccessToken(null);

    localStorage.setItem('isAuthenticated', false.toString());
    navigate('/login'); // Replace '/login' with the actual path of your login page

  };

  useEffect(() => {
    // Retrieve the isAuthenticated value from local storage
    const isAuthenticatedValue = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(isAuthenticatedValue === 'true');
  }, []);


  const register = async () => {

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, refreshToken, email, password, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };