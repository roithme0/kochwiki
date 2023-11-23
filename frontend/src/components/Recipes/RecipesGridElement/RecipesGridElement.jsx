import css from "./RecipesGridElement.module.css"

export default function RecipesGridElement({ recipe }) {
  return <p>{recipe.name}</p>
}
