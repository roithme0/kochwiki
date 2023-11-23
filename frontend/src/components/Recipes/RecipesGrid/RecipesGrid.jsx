import css from "./RecipesGrid.module.css"

import RecipesGridElement from "../RecipesGridElement"

export default function RecipesGrid({ recipes }) {
  return (
    <div className={css.gridWrapper}>
      <div className={css.controls}>Controls</div>
      <div className={css.recipesWrapper}>
        {recipes.map(recipe => (
          <RecipesGridElement key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
