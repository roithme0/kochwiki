import css from "./Recipes.module.css"

import { fetchRecipes } from "../../services/api/Recipe/Recipe"
import { useState, useEffect } from "react"

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
    <main>
      <article></article>
    </main>
  )
}
