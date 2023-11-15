import "./IngredientsGrid.css"

import IngredientsGridHeader from "../IngredientsGridHeader/IngredientsGridHeader"
import IngredientsGridBody from "../IngredientsGridBody/IngredientsGridBody"

export default function IngredientsGrid({ ingredients }) {
  // render header and grid of ingredients

  return (
    <>
      <IngredientsGridHeader verboseNames={ingredients[0].verbose_names} />
      <IngredientsGridBody initialIngredients={ingredients} />
    </>
  )
}
