import css from "./RecipesGrid.module.css"

import RecipesGridElement from "../RecipesGridElement"
import Search from "../../ui/Search/Search"
import { useState, useEffect } from "react"

export default function RecipesGrid({
  initialRecipes, // Array<Object> -> unordered and unfiltered list of recipes to display
}) {
  const [search, setSearch] = useState("")
  const [processedRecipes, setProcessedRecipes] = useState(initialRecipes)

  useEffect(() => {
    // search recipes
    var recipes = [...initialRecipes]
    recipes = searchRecipes({ recipes, search })
    setProcessedRecipes(recipes)
  }, [search])

  return (
    <div className={css.gridWrapper}>
      <div className={css.gridControls}>
        <Search setSearch={setSearch} placeholder="Name suchen ..." />
      </div>
      {processedRecipes.length === 0 ? (
        <p className={css.placeholder}>Keine passenden Rezepte gefunden.</p>
      ) : (
        <div className={css.recipesWrapper}>
          {processedRecipes.map(recipe => (
            <RecipesGridElement key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

function searchRecipes({ recipes, search }) {
  // search recipes
  if (!search) {
    console.debug("no search string")
    return recipes
  }
  console.debug("searching recipes: ", search)
  return recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(search.toLowerCase())
  })
}
