import "./IngredientsGridRow.css"

import IngredientsField from "../IngredientField/IngredientField"

export default function IngredientsGridRow({ ingredient, fields }) {
  // render row of ingredients grid

  return (
    <div key={ingredient.id} className="ingredients-grid-row">
      {fields.map(fieldName => (
        <IngredientsField
          ingredient={ingredient}
          fieldName={fieldName}
          key={fieldName}
        />
      ))}
    </div>
  )
}
