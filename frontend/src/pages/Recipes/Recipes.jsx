import css from "./Recipes.module.css"

import RecipesGrid from "../../components/Recipes/RecipesGrid"
import { useEffect } from "react"

export default function Recipes({ setHeadline, setBack }) {
  useEffect(() => {
    setHeadline("Rezepte")
    setBack({ url: "/", visibility: "" })
  }, [])

  return (
    <main>
      <RecipesGrid />
    </main>
  )
}
