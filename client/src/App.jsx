import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Home from './pages/Home';
import RecipeInformation from './pages/Home/RecipeInformation';
import { RecipeProvider } from './context/RecipeContext';
import { SidebarProvider } from './context/SidebarContext';
import Bookmark from './pages/Navbar-pages/Bookmark';
import ForgotPassword from './pages/PasswordReset/forgotPassword';
import CheckEmail from './pages/PasswordReset/Checkmail';
import ResetPassword from './pages/PasswordReset/ResetPassword';

import Help from './pages/landing-pages/footer-pages/Help';
import Contact from './pages/landing-pages/footer-pages/Contact';
import FAQs from './pages/landing-pages/footer-pages/FAQs';
import Privacy from './pages/landing-pages/footer-pages/Privacy';
import Terms from './pages/landing-pages/footer-pages/Terms';
import CookingTips from './pages/landing-pages/footer-pages/CookingTips';
import MealPlans from './pages/landing-pages/footer-pages/MealPlans';
import IngredientSubs from './pages/landing-pages/footer-pages/IngredientSubs';
import Guides from './pages/landing-pages/footer-pages/Guides';


import Forums from './pages/landing-pages/footer-pages/Forums';
import Challenges from './pages/landing-pages/footer-pages/Challenges';
import Events from './pages/landing-pages/footer-pages/Events';
import Ambassadors from './pages/landing-pages/footer-pages/Ambassadors';

import Careers from './pages/landing-pages/footer-pages/Careers';
import Blog from './pages/landing-pages/footer-pages/Blog';
import Press from './pages/landing-pages/footer-pages/Press';
import Partners from './pages/landing-pages/footer-pages/Partners';
import Premium from './pages/Premium/Premium';
import Success from './pages/Premium/Success';
import Failure from './pages/Premium/Failure';
import SearchRecipes from './pages/Navbar-pages/SearchRecipes';

import IngredientInfo from './pages/Navbar-pages/IngredientInfo';
import Profile from './pages/Navbar-pages/Profile';
import Settings from './pages/Navbar-pages/Settings';
import DangerZone from './pages/Navbar-pages/settings/DangerZone';
import PasswordSecurity from './pages/Navbar-pages/settings/PasswordSecurity';
import Preferences from './pages/Navbar-pages/settings/Preferences';




function App() {


  return (
    <>
      <RecipeProvider>
        <SidebarProvider >
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
            <Route path='/searchrecipes' element={<SearchRecipes />} />
            <Route path='/ingredientinfo' element={<IngredientInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/guides" element={<Guides />} />


            <Route path="/cooking-tips" element={<CookingTips />} />
            <Route path="/meal-plans" element={<MealPlans />} />
            <Route path="/ingredient-subs" element={<IngredientSubs />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/events" element={<Events />} />
            <Route path="/ambassadors" element={<Ambassadors />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/press" element={<Press />} />
            <Route path="/partners" element={<Partners />} />

            <Route path="/premium" element={<Premium />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />


            <Route path='/dangerzone' element={<DangerZone />} />
            <Route path='/preferences' element={<Preferences />} />
            <Route path='/passwordsecurity' element={<PasswordSecurity />} />


          </Routes>
        </SidebarProvider>
      </RecipeProvider>
    </>
  )
}

export default App
