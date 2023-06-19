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


  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);

  }, [isAuthenticated]);



  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/token/obtain/', {
        email,
        password
      });
  
      const { refresh, access } = response.data;
  
      setIsAuthenticated(true);
      setUser(response.data.user);
      setRefreshToken(refresh);
      setAccessToken(access);
      console.log("refresh token is " + refresh);
      console.log("access token is " + access);
  
      setError('');
      navigate('/jobs'); // Replace '/' with the actual path of your home page
  
      if (refresh) {
        const decodedToken = jwt_decode(refresh);
        const userId = decodedToken.user_id; // Assuming the user ID is stored in the 'user_id' claim
        console.log('User ID:', userId);
        // Use the user ID as needed
        setUserId(userId)
      }

      console.log(userId);
      const seekerResponse = await axios.get(`http://127.0.0.1:8000/users/api/seeker/${userId}/`);
      console.log(seekerResponse.data[0].id);
      setSeekerId(seekerResponse.data[0].id)


      // localStorage.setItem('seekerId', seekerId);
      // const storage = localStorage.getItem('seekerId');
      // console.log("storage",storage);
      localStorage.setItem('seekerId', seekerResponse.data[0].id);
      localStorage.getItem('seekerId');
      localStorage.setItem('seekerId', seekerResponse.data[0].id);
      
    } catch (error) {
      setError('Invalid email or password.');
    } 
    
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRefreshToken(null);
    setAccessToken(null);
    navigate('/login'); // Replace '/login' with the actual path of your login page
  };

  const register = async () => {

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, refreshToken, email, password, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };