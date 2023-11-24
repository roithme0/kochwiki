import css from "./RecipesGrid.module.css"

import RecipesGridElement from "../RecipesGridElement"
import Search from "../../ui/Search/Search"
import { useState, useEffect } from "react"

export default function RecipesGrid({ recipes }) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    // search recipes
  }, [search])

  return (
    <div className={css.gridWrapper}>
      <div className={css.gridControls}>
        <Search setSearch={setSearch} placeholder="Name suchen ..." />
      </div>
      <div className={css.recipesWrapper}>
        {recipes.map(recipe => (
          <RecipesGridElement key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

function searchRecipes({ recipes, search }) {
  // search recipes
}
