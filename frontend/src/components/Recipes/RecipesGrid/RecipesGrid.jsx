import css from "./RecipesGrid.module.css"

import RecipesGridElement from "../RecipesGridElement"

export default function RecipesGrid({ recipes }) {
  return (
    <>
      <div className={css.controls}>
        <p>Search</p>
        <p>Filter</p>
      </div>
      <div className={css.recipesWrapper}>
        {recipes.map(recipe => (
          <RecipesGridElement recipe={recipe} />
        ))}
      </div>
    </>
  )
}
