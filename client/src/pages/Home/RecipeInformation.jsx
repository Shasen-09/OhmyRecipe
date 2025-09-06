import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBAr from "../NavBAr.jsx";
import { useRecipes } from "../../context/RecipeContext.jsx";
import { BiSolidDish } from "react-icons/bi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoPricetag } from "react-icons/io5";
import recipeServices from "../../services/recipeServices.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa6";


const RecipeInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { toggleBookmark, isBookmarked, bookmarks } = useRecipes();

  const [recipeDetails, setRecipeDetails] = useState(null)
  const [nutrients, setNutrients] = useState('');
  const [taste, setTaste] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ingredientList, setIngredientList] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchRecipedetails = async () => {
      try {
        const response = await recipeServices.recipeDetailsbyId(id);
        setRecipeDetails(response.data);
        setTitle(response.data.title);
        console.log("Recipe ID:", id);
        console.log("Recipedetails:", response.data)
        const ingredients = response.data.extendedIngredients;
        if (!ingredients || !Array.isArray(ingredients)) {
          alert("Recipe does not contain ingredients info. Redirecting to home.");
          navigate("/home");
          return;
        }

        const ingredientListString = ingredients
          .map(ingredient => ingredient.name)
          .join('\n');
        setIngredientList(ingredientListString);

      } catch (error) {
        alert("No recipe details found. Redirecting to home.");
        navigate("/home");
        console.log(error)
      }
    };

    fetchRecipedetails();
  }, [id, navigate]);



  useEffect(() => {


    const fetchNutrients = async () => {
      try {
        const res = await recipeServices.getNutrientsDetails(id);
        const resTaste = await recipeServices.getTaste(id);
        const resSimilar = await recipeServices.getSimilarRecipes(id);
        const resEquipment = await recipeServices.getEquipment(id);
        setNutrients(res.data);
        setTaste(resTaste.data);
        setSimilarRecipes(resSimilar.data);
        setEquipment(resEquipment.data.equipment);
        console.log("Fetched nutrients:", res.data);
        console.log("Taste: ", resTaste.data)
        console.log("SimilarRecipes:", resSimilar.data)
        console.log("Equipment: ", resEquipment.data.equipment)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(true);
      }
    }
    fetchNutrients();

  }, [id]);

  useEffect(() => {
    if (title && ingredientList) {
      const fetchCuisine = async () => {
        try {
          const response = await recipeServices.getCuisine(title, ingredientList)
          console.log("Cuisine:", response.data)
          setCuisines(response.data.cuisines)
        } catch (error) {
          console.log(error)
        }
      }
      fetchCuisine();
    }

  }, [title, ingredientList])

  const similarRecipePage = (newId) => {
    window.location.href = `/recipe/${newId}`;
  };


  useEffect(() => {
    console.log("Updated bookmarks:", bookmarks);
  }, [bookmarks]);

  if (!recipeDetails) return null;


  ;

  return (
    <>
      <NavBAr />
      <>
        <div className=" absolute mt-10 right-0 z-50">
          <button
            onClick={() => { toggleBookmark(recipeDetails); console.log(bookmarks) }}
            className="px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer"
          >
            {isBookmarked(recipeDetails.id) ? (
              <FaHeart className="text-blue-600 text-3xl" />
            ) : (
              <FaRegHeart className="text-gray-400 text-3xl" />
            )}
          </button>

        </div>

        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full -left-28 -top-0.05 absolute blur-[50px] pointer-events-none"></div>

        <div className="relative z-0 flex justify-center pt-5 ">
          <div className="flex py-5 mx-10 w-full gap-25 items-center">
            <img
              src={recipeDetails.image}
              alt={recipeDetails.title}
              className="w-100 h-100 rounded-full object-cover"
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl text-center text-blue-600 font-bold">
                {recipeDetails.title}
              </h1>
              <div className="text-xl font-semibold max-h-80 overflow-y-auto border p-4 border-gray-300 shadow-lg rounded-lg">
                <ol className="list-decimal list-inside space-y-2  md:columns-2 gap-4">

                  {recipeDetails.extendedIngredients?.map((item, idx) => (
                    <li key={`${item.id}-${idx}`} className="capitalize">
                      {item.name}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col justify-start items-center">
                <h1 className="capitalize text-lg font-semibold"><BiSolidDish className="inline-block mr-2 -mt-1.5 text-blue-600" /><span className="text-blue-600 text-xl">Type of Dish: </span>{recipeDetails.dishTypes.join(", ")}</h1>
                <h1 className="capitalize text-lg font-semibold"><GiForkKnifeSpoon className="inline-block mr-2 -mt-1.5 text-blue-600" /><span className="text-blue-600 text-xl">Diets: </span>{recipeDetails.diets.join(", ")}</h1>
                <p className="capitalize text-lg  font-semibold "><IoPricetag className="inline-block mr-2 -mt-1.5 text-blue-600" /><span className="text-xl text-blue-600">Id: </span>{id}</p>
              </div>

            </div>
          </div>
        </div>



        <div className="w-[80%] mx-auto mt-5 p-6 bg-white shadow-lg rounded-xl ">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            Instructions
          </h2>
          <div className="text-gray-700 text-base leading-relaxed text-justify">
            <ol className="list-decimal list-inside space-y-2">
              {recipeDetails.instructions.split('\n').map((step, idx) => (
                <li key={`${step}-${idx}`}>{step}</li>
              ))}
            </ol>

          </div>
        </div>

        {taste && (
          <div className="w-[80%] mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Taste Profile</h2>

            <div className="space-y-4">
              {Object.entries(taste).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="capitalize w-28 font-semibold">{key}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${Math.min(value, 100)}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right text-sm text-gray-600">
                    {value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {nutrients && (
          <div className="mt-10 w-[80%] mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Nutrition Facts
            </h2>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-lg font-semibold">Calories</p>
                <p className="text-xl text-blue-600">{nutrients.calories}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-lg font-semibold">Carbs</p>
                <p className="text-xl text-blue-600">{nutrients.carbs}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-lg font-semibold">Fat</p>
                <p className="text-xl text-blue-600">{nutrients.fat}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-lg font-semibold">Protein</p>
                <p className="text-xl text-blue-600">{nutrients.protein}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Detailed Nutrients</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Nutrient</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">% Daily Needs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nutrients.nutrients?.map((n) => (
                        <tr key={n.name} className="border-t">
                          <td className="px-4 py-2">{n.name}</td>
                          <td className="px-4 py-2">
                            {n.amount} {n.unit}
                          </td>
                          <td className="px-4 py-2">{n.percentOfDailyNeeds}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                      Good For You
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      {nutrients.good?.map((item, idx) => (
                        <li key={`${item.title}-${idx}`}>
                          {item.title} ({item.amount}{item.unit}, {item.percentOfDailyNeeds}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Limit</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      {nutrients.bad?.map((item, idx) => (
                        <li key={`${item.title}-${idx}`}>
                          {item.title} ({item.amount}{item.unit}, {item.percentOfDailyNeeds}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Caloric Breakdown</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Protein: {nutrients.caloricBreakdown?.percentProtein}%</li>
                    <li>Fat: {nutrients.caloricBreakdown?.percentFat}%</li>
                    <li>Carbs: {nutrients.caloricBreakdown?.percentCarbs}%</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold  mb-2">Similar Recipes</h3>
                  <ul className="list-disc space-y-1 ml-6">
                    {similarRecipes.map((similar, idx) => (
                      <li key={idx} className="capitalize" ><a className="underline text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => similarRecipePage(similar.id)}>{similar.title}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold  mb-2">Equipment</h3>
                  <ul className="list-disc  space-y-1 ml-6 ">
                    {equipment.map((item, idx) => (
                      <li key={idx} className="capitalize">
                        <span>{item.name}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        )}



      </>
    </>
  );
};

export default RecipeInformation;
