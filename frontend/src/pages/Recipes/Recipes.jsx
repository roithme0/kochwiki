import css from "./Recipes.module.css"

import RecipesGrid from "../../components/Recipes/RecipesGrid"
import getRecipes from "../../services/api/Recipe/getRecipes"
import { useState, useEffect } from "react"

export default function Recipes({ setHeadline, setBack }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // configure page header
    setHeadline("Rezepte")
    setBack({ url: "/", visibility: "" })
  }, [])

  useEffect(() => {
    // fetch recipes
    getRecipes({ setFunction: setRecipes, errorCallback: () => {} })
  }, [])

  return (
    <main>
      <RecipesGrid recipes={recipes} />
    </main>
  )
}
