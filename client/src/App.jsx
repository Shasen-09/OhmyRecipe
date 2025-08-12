import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Home from './pages/Home';
import RecipeInformation from './pages/Home/RecipeInformation';
import { RecipeProvider } from './context/RecipeContext';

function App() {


  return (
    <>
      <RecipeProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeInformation />} />
        </Routes>
      </RecipeProvider>
    </>
  )
}

export default App
