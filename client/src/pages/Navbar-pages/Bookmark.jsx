import React, { useEffect, useState, useCallback } from "react";
import NavBAr from "../NavBAr.jsx";
import { useNavigate } from "react-router-dom";
import bookmarkServices from "../../services/bookmarkServices";
import { FaHeart } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

const Bookmark = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return;
    }

    try {
      const data = await bookmarkServices.getBookmarks();
      setBookmarks(data || []);


      if (data && data.length > 0) {
        const latest = data[data.length - 1];
        localStorage.setItem("lastBookmarkedId", latest.id);
      }
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      alert("Failed to load bookmarks. Please login again.");
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemove = async (recipeId) => {

    setBookmarks((prev) => prev.filter((r) => r.id !== recipeId));

    try {
      await bookmarkServices.removeBookmark(recipeId);
      fetchBookmarks();
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      fetchBookmarks();
    }
  };

  if (loading) return <p className="p-5 text-center">Loading bookmarks...</p>;

  return (
    <>
      <NavBAr />
      <div className="p-5">

        <div className="relative flex items-center justify-center mb-6">

          <div className="absolute left-0 text-3xl text-blue-600 cursor-pointer">
            <IoMdArrowRoundBack
              onClick={() => {
                const lastBookmarkedId = localStorage.getItem("lastBookmarkedId");
                if (lastBookmarkedId) {
                  navigate(`/recipe/${lastBookmarkedId}`);
                } else {
                  navigate("/home");
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-center w-full">
            Bookmarked Recipes
          </h1>
        </div>


        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-600">No bookmarks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookmarks.map((recipe) => (
              <div
                key={recipe.id}
                className="relative bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 hover:shadow-2xl transition-shadow cursor-pointer"
              >

                <FaHeart
                  onClick={() => handleRemove(recipe.id)}
                  className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer hover:text-red-700 transition-colors duration-200 z-10"
                />


                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded mb-3"
                  onClick={() =>
                    navigate(`/recipe/${recipe.id}`, {
                      state: { recipeDetails: recipe },
                    })
                  }
                />


                <h3
                  className="text-lg font-semibold text-center line-clamp-2"
                  onClick={() =>
                    navigate(`/recipe/${recipe.id}`, {
                      state: { recipeDetails: recipe },
                    })
                  }
                >
                  {recipe.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmark;
