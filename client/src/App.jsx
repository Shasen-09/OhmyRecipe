import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Home from './pages/Home';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
