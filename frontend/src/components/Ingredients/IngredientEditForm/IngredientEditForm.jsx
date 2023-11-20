import css from "./IngredientEditForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import { useState } from "react"

export default function IngredientEditForm({ initialIngredient }) {
  const fields = {
    name: { type: "text" },
    brand: { type: "text" },
    unit: { type: "selectUnit" },
    kcal: { type: "number" },
    carbs: { type: "number" },
    protein: { type: "number" },
    fat: { type: "number" },
  }
  const [ingredient, setIngredient] = useState(initialIngredient)

  return (
    <form className={css.form} onSubmit={() => {}}>
      <div className={css.fieldsWrapper}>
        {Object.keys(fields).map(fieldName => (
          <FormField
            label={ingredient.verbose_names[fieldName]}
            type={fields[fieldName]["type"]}
            key={fieldName}
            classNameInput={css[fields[fieldName]["type"] + "Input"]}
            initialValue={ingredient[fieldName]}
          />
        ))}
      </div>
      <div className={css.buttonsWrapper}>
        <Button type="positive" svg={mdiCheck} className={css.saveButton} />
        <Button
          type="negative"
          svg={mdiCancel}
          className={css.cancelButton}
          clickHandler={event => event.preventDefault()}
        />
      </div>
    </form>
  )
}
