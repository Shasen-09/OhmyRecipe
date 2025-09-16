import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Home from './pages/Home';
import RecipeInformation from './pages/Home/RecipeInformation';
import { RecipeProvider } from './context/RecipeContext';
import Bookmark from './pages/Navbar-pages/Bookmark';
import ForgotPassword from './pages/PasswordReset/forgotPassword';
import CheckEmail from './pages/PasswordReset/Checkmail';
import ResetPassword from './pages/PasswordReset/ResetPassword';

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
          <Route path='/recipe/:id' element={<RecipeInformation />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />


        </Routes>
      </RecipeProvider>
    </>
  )
}

export default App
