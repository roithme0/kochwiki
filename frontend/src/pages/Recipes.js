import "./Recipes.css"

import imageOffOutline from "../assets/images/mdi/image-off-outline.png"

import { fetchRecipes } from "../services/api/Recipe"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Recipes({ setHeadline, setBack }) {
  useEffect(() => {
    setHeadline("Rezepte")
    setBack({ url: "/", visibility: "" })
  }, [])

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes({ setFunction: setRecipes })
  }, [])

  return (
    <main className="recipes">
      <article className="main-content">
        {recipes.map(recipe => (
          <Link to="#" key={recipe.id}>
            {recipe.image ? (
              <img src={recipe.image} alt={recipe.name} />
            ) : (
              <img src={imageOffOutline} alt={recipe.name} />
            )}
            <span>{recipe.name}</span>
          </Link>
        ))}
      </article>
    </main>
  )
}
