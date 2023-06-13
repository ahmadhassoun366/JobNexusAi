import './App.css';
import Home from './Pages/Home';  
import Login from './Pages/Login';
import Blogs from './Pages/Blogs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Seeker from './Pages/jobs';
import JobDetails from './Pages/jobDetails';
import { AuthProvider } from './Services/AuthContext';


function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Seeker />} />
            <Route path="/jobDetails/:id" element={<JobDetails />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
