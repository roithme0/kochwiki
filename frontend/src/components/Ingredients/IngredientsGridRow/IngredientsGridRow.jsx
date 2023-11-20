import css from "./IngredientsGridRow.module.css"

import IngredientField from "../IngredientField"

export default function IngredientsGridRow({ ingredient, fields }) {
  // render row of ingredients grid

  return (
    <div key={ingredient.id} className={css.ingredientsGridRow}>
      {fields.map(fieldName => (
        <IngredientField
          ingredient={ingredient}
          fieldName={fieldName}
          key={fieldName}
        />
      ))}
    </div>
  )
}
