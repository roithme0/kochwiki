import "./IngredientsGridBody.css"

import IngredientsGridRow from "../IngredientsGridRow/IngredientsGridRow"

export default function IngredientsGridBody({ initialIngredients }) {
  return initialIngredients.map(ingredient => (
    <IngredientsGridRow ingredient={ingredient} key={ingredient.id} />
  ))
}
