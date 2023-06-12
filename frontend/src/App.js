import './App.css';
import Home from './Pages/Home';  
import Login from './Pages/Login';
import Blogs from './Pages/Blogs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Profile from './Pages/Profile';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
