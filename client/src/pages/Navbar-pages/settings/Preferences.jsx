import React, { useState, useEffect } from "react";
import axios from "axios";
import { KNOWN_ALLERGIES, KNOWN_DIETS } from "../../../constants/knownPrefernces";

const Preferences = () => {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState("");
  const [loading, setLoading] = useState(true); // Optional loading state

  // Fetch user preferences on component mount
  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/user/getProfile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.preferences) {
          setSelectedDiets(res.data.preferences.diets || []);
          setSelectedAllergies(res.data.preferences.allergies || []);
          setDislikedIngredients(
            (res.data.preferences.dislikedIngredients || []).join(", ")
          );
        }
      } catch (err) {
        console.error("Failed to fetch preferences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []); // runs every time the component mounts

  const toggleItem = (item, list, setList) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  // Save preferences to backend
  const handleSave = async () => {
    const payload = {
      diets: selectedDiets,
      allergies: selectedAllergies,
      dislikedIngredients: dislikedIngredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    try {
      await axios.put("/user/preferences", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Preferences saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save preferences");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading preferences...</div>;
  }

  return (
    <div className="max-w-4xl bg-white rounded-2xl shadow-md p-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">
        Food Preferences
      </h2>

      {/* Diets */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dietary Preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {KNOWN_DIETS.map((diet) => (
            <label
              key={diet}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition
                ${selectedDiets.includes(diet)
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-300 hover:border-blue-300"
                }`}
            >
              <input
                type="checkbox"
                checked={selectedDiets.includes(diet)}
                onChange={() => toggleItem(diet, selectedDiets, setSelectedDiets)}
                className="accent-blue-600"
              />
              <span className="capitalize text-gray-700 text-sm">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Allergies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {KNOWN_ALLERGIES.map((allergy) => (
            <label
              key={allergy}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition
                ${selectedAllergies.includes(allergy)
                  ? "bg-red-50 border-red-400"
                  : "border-gray-300 hover:border-red-300"
                }`}
            >
              <input
                type="checkbox"
                checked={selectedAllergies.includes(allergy)}
                onChange={() => toggleItem(allergy, selectedAllergies, setSelectedAllergies)}
                className="accent-red-500"
              />
              <span className="capitalize text-gray-700 text-sm">{allergy}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Disliked Ingredients */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Disliked Ingredients
        </label>
        <textarea
          value={dislikedIngredients}
          onChange={(e) => setDislikedIngredients(e.target.value)}
          placeholder="e.g. mushrooms, olives, onions"
          rows={3}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-gray-500 mt-1">Separate items with commas</p>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preferences;
