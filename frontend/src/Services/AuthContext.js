import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);



  const login = async ( email,
    password) => {
   
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/token/obtain/', {
        email,
        password
      });
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      setToken(response.data.token);
      setError('');
      alert('logged INNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
      navigate('/'); // Replace '/' with the actual path of your home page

    } catch (error) {
      setError('Invalid email or password.');
    }
    console.log('authhhhhhhhhhhhhhhhhhhh');
    console.log(email);
    console.log(password);
    console.log(isAuthenticated);
    
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    navigate('/login'); // Replace '/login' with the actual path of your login page
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);

      setIsAuthenticated(true);
      setUser(response.data.user);
      setToken(response.data.token);
      setError('');

      navigate('/'); // Replace '/' with the actual path of your home page

    } catch (error) {
      setError('Registration failed.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, email, password, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
