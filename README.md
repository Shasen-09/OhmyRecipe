# OhMyRecipe

### Personalized Recipe Recommendation System for Healthier Choices and Less Food Waste

OhMyRecipe is a recipe recommendation system I built around a simple question:

**What can I cook with the food I already have?**

Choosing a meal can be surprisingly difficult when you have a few ingredients at home, dietary restrictions, allergies, or simply no idea what to make. At the same time, food sitting unused in the kitchen often ends up being thrown away.

OhMyRecipe tries to solve both problems in one place. Users can describe what they have and what they want in normal language, for example:

> "I have chicken, rice, and tomatoes, but no dairy."

The system understands the request, finds relevant recipes, checks the user's restrictions, and provides nutritional information.

## Sustainable Development Goals

### SDG 3: Good Health and Well-Being

Food choices are closely connected to everyday health. OhMyRecipe makes it easier for users to find meals that fit their dietary preferences and understand the nutritional content of those meals.

The system supports requirements such as:

* Vegan
* Keto
* Gluten-free
* Nut-free
* Specific ingredients to avoid

For important dietary and allergy restrictions, the system uses predefined rules instead of relying only on the language model. This helps keep those requirements clear and consistent.

The goal is not to provide medical advice, but to make everyday meal planning a little more informed and accessible.

### SDG 12: Responsible Consumption and Production

Food waste is one of the problems that motivated this project.

Instead of starting with a recipe and asking users to buy everything required, OhMyRecipe can start with the ingredients they already have. It then looks for recipes that make use of those ingredients.

For example:

**What I have:** Chicken, rice, tomatoes, onions
**What I want:** No dairy
**Result:** Recipes that make use of those ingredients while respecting the restriction

The idea is simple: **use what is already available before buying more.**

This can encourage better use of household ingredients, more thoughtful meal planning, and potentially less avoidable food waste.

## AI and Data

The project uses **Groq LLM** to understand natural-language requests. Instead of forcing users to select ingredients through a long list of filters, they can simply describe what they have and what they need.

The system extracts information such as:

* Ingredients available
* Ingredients to avoid
* Dietary preferences
* Other recipe requirements

This information is then used with **Spoonacular's recipe and nutrition data** to find suitable recipes.

An important part of the project is that AI is not responsible for everything. Dietary and allergy-related conditions are also checked using predefined rules, giving the application a more predictable way of handling important restrictions.

## Key Features

* **Natural Language Search**
  Describe what you have and what you want using normal language.

* **Dietary and Allergy Filtering**
  Filter recommendations based on dietary preferences and ingredients to avoid.

* **Nutrition Information**
  View nutritional information alongside recommended recipes.

* **Ingredient-Based Recommendations**
  Find recipes that make use of ingredients already available at home.

* **User Accounts**
  Secure authentication using JWT and bcrypt, with password-reset functionality.

* **Khalti Payments**
  Khalti integration for premium subscription features.

## Tech Stack

* Frontend: React.js, Tailwind CSS, Redux
* Backend: Node.js, Express.js
* Database: MongoDB
* Natural Language Processing: Groq LLM
* Recipe & Nutrition Data: Spoonacular API
* Authentication: JWT, bcrypt
* Payments: Khalti API

## Why I Built It

OhMyRecipe started as an attempt to solve a small everyday problem: **figuring out what to cook with what is already in the kitchen**.

While building it, the project grew into an exploration of how natural-language interfaces, recipe data, and simple rule-based systems can be combined to address broader issues around **food choices, nutrition, and food waste**.

The project is particularly connected to **SDG 3 (Good Health and Well-Being)** and **SDG 12 (Responsible Consumption and Production)**.

## Project Information

**Author:** Shasen Shrestha
**Institution:** Asian Institute of Technology and Management (AITM), Nepal
**Supervisor:** Shyam Sunder Khatiwada
**GitHub:** (https://github.com/Shasen09)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Shasen09/ohmyrecipe.git
cd OhmyRecipe
npm run server
```

Install the frontend and backend dependencies, configure the required environment variables, and start the development servers.

### Required Services

* MongoDB
* Groq API
* Spoonacular API
* Khalti API
