import axios from "axios";

const token = localStorage.getItem("token");

const getBookmarks = async () => {
  try {
    const response = await axios.get("/api/bookmark", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error.response?.data || error.message);
  }
};

const addBookmark = async (recipe) => {
  try {
    const response = await axios.post(
      "/api/bookmark",
      {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error.response?.data || error.message);
    return null;
  }
};

const removeBookmark = async (recipeId) => {
  try {
    const response = await axios.delete(`/api/bookmark/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing bookmark:", error.response?.data || error.message);
    return null;
  }
};


const bookmarkServices = { getBookmarks, addBookmark, removeBookmark }
export default bookmarkServices;