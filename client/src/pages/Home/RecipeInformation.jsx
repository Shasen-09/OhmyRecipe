import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBAr from "../NavBAr.jsx";
import { useRecipes } from "../../context/RecipeContext.jsx";
import { BiSolidDish } from "react-icons/bi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoPricetag } from "react-icons/io5";
import recipeServices from "../../services/recipeServices.jsx";

const RecipeInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { toggleBookmark, isBookmarked, bookmarks, ingredients } = useRecipes();

  const recipeDetails = location.state?.recipeDetails;
  const [nutrients, setNutrients] = useState('');
  const [taste, setTaste] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!recipeDetails) {
      alert("No recipe details found. Redirecting to home.");
      navigate("/home");
    }
    console.log("Recipe Details: ", recipeDetails);

    const fetchNutrients = async () => {
      try {
        const res = await recipeServices.getNutrientsDetails(id);
        const resTaste = await recipeServices.getTaste(id);
        setNutrients(res.data);
        setTaste(resTaste.data);
        console.log("Fetched nutrients:", res.data);
        console.log("Taste: ", resTaste.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(true);
      }
    }
    fetchNutrients();

  }, [id, recipeDetails, navigate]);



  useEffect(() => {
    console.log("Updated bookmarks:", bookmarks);
  }, [bookmarks]);

  if (!recipeDetails) return null;


  ;

  return (
    <>
      <NavBAr />
      <>
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

        <div className="w-[80%] mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
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
          <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">
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
                <h3 className="text-lg font-semibold text-red-600 mb-2">Limit</h3>
                <ul className="list-disc ml-6 space-y-1">
                  {nutrients.bad?.map((item, idx) => (
                    <li key={`${item.title}-${idx}`}>
                      {item.title} ({item.amount}{item.unit}, {item.percentOfDailyNeeds}%)
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            <div>
              <h3 className="text-xl font-semibold mb-2">Caloric Breakdown</h3>
              <p>Protein: {nutrients.caloricBreakdown?.percentProtein}%</p>
              <p>Fat: {nutrients.caloricBreakdown?.percentFat}%</p>
              <p>Carbs: {nutrients.caloricBreakdown?.percentCarbs}%</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => toggleBookmark(recipeDetails)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isBookmarked(recipeDetails.id) ? "Remove Bookmark" : "Add Bookmark"}
          </button>
        </div>
      </>
    </>
  );
};

export default RecipeInformation;
