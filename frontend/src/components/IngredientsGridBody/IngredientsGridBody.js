import "./IngredientsGridBody.css"

import IngredientsGridRow from "../IngredientsGridRow/IngredientsGridRow"

export default function IngredientsGridBody({ initialIngredients }) {
  // render grid body

  const { verbose_names: verboseNames } = initialIngredients[0]
  delete verboseNames["id"]
  const rowFields = Object.keys(verboseNames)

  return initialIngredients.map(ingredient => (
    <IngredientsGridRow
      ingredient={ingredient}
      fields={rowFields}
      key={ingredient.id}
    />
  ))
}
