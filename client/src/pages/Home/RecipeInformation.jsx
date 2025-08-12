import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RecipeInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const recipeDetails = location.state?.recipeDetails;

  useEffect(() => {
    if (!recipeDetails) {
      alert("No recipe details found. Redirecting to home.");
      navigate('/home');
    }
  }, [recipeDetails, navigate]);

  if (!recipeDetails) return null;

  return (
    <div>
      <h1>Recipe Details for ID: {id}</h1>
      <p>{recipeDetails.title}</p>
    </div>
  );
};

export default RecipeInformation;
