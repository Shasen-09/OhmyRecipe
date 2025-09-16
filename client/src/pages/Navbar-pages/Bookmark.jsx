import React, { useEffect, useState, useCallback } from "react";
import NavBAr from "../NavBAr.jsx";
import { useNavigate } from "react-router-dom";
import bookmarkServices from "../../services/bookmarkServices";
import { FaHeart } from "react-icons/fa6";

const Bookmark = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarks function
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
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      alert("Failed to load bookmarks. Please login again.");
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Fetch on component mount
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Handle bookmark removal (optimistic + silent fetch)
  const handleRemove = async (recipeId) => {
    // Remove from UI immediately
    setBookmarks((prev) => prev.filter((r) => r.id !== recipeId));

    try {
      await bookmarkServices.removeBookmark(recipeId);
      // Re-fetch silently to sync with backend
      fetchBookmarks();
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      // Rollback if needed
      fetchBookmarks();
    }
  };

  if (loading) return <p className="p-5 text-center">Loading bookmarks...</p>;

  return (
    <>
      <NavBAr />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Bookmarked Recipes</h1>

        {bookmarks.length === 0 ? (
          <p className="text-center">No bookmarks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookmarks.map((recipe) => (
              <div
                key={recipe.id}
                className="relative bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 hover:shadow-2xl transition-shadow cursor-pointer"
              >
                {/* Heart icon for removal */}
                <FaHeart
                  onClick={() => handleRemove(recipe.id)}
                  className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer hover:text-red-700 transition-colors duration-200 z-10"
                />

                {/* Recipe Image */}
                <img
                  src={recipe.image || "https://via.placeholder.com/300"}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded mb-3"
                  onClick={() =>
                    navigate(`/recipe/${recipe.id}`, { state: { recipeDetails: recipe } })
                  }
                />

                {/* Recipe Title */}
                <h3
                  className="text-lg font-semibold text-center line-clamp-2"
                  onClick={() =>
                    navigate(`/recipe/${recipe.id}`, { state: { recipeDetails: recipe } })
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
