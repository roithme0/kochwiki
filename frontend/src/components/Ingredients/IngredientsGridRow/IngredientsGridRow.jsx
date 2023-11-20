import css from "./IngredientsGridRow.module.css"

import { mdiPencil, mdiDeleteOutline } from "@mdi/js"
import IngredientField from "../IngredientField"
import Button from "../../ui/Button"

export default function IngredientsGridRow({
  ingredient,
  fields,
  setIngredientEditPopup,
}) {
  // render row of ingredients grid

  return (
    <div key={ingredient.id} className={css.ingredientsGridRow}>
      {fields.map(fieldName => {
        if (fieldName === "edit") {
          return (
            <Button
              svg={mdiPencil}
              className={css.editButton}
              clickHandler={() => {
                setIngredientEditPopup(true)
              }}
              key={fieldName}
            />
          )
        } else if (fieldName === "delete") {
          return (
            <Button
              svg={mdiDeleteOutline}
              className={css.deleteButton}
              clickHandler={() => {}}
              key={fieldName}
            />
          )
        } else {
          return (
            <IngredientField
              ingredient={ingredient}
              fieldName={fieldName}
              key={fieldName}
            />
          )
        }
      })}
    </div>
  )
}
