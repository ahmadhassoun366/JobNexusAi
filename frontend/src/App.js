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
import RecruiterDashboard from './Pages/RecruiterDashboard';
import GetApplicants from './Pages/GetApplicants';
import NewJob from './Pages/NewJob';
import EditJob from './Pages/EditJob';
import RecruiterProfile from './Pages/RecruiterProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          {/* <Route path="*" element={<NoPage />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/applicants/:id" element={<GetApplicants />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/jobs" element={<Seeker />} />
          <Route path="/jobDetails/:id" element={<JobDetails />} />
          <Route path="/newJob" element={<NewJob />} />
          <Route path="/editJob/:id" element={<EditJob />} />
          <Route path="/editRecruiterProfile/:id" element={<RecruiterProfile />} />

=======
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            {/* <Route path="*" element={<NoPage />} /> */}
            
            <Route path="/login" element={<Login />} />
            <Route path="/applicants/:id" element={<GetApplicants />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/jobs" element={<Seeker />} />
            <Route path="/jobDetails/:id" element={<JobDetails />} />
            <Route path="/newJob" element={<NewJob />} />
            <Route path="/editJob/:id" element={<EditJob />} />
            <Route path="/editRecruiterProfile/:id" element={<RecruiterProfile/>}/>
>>>>>>> main
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
