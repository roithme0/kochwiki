import css from "./IngredientAddForm.module.css"

import { mdiContentSaveOutline, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField/FormField"
import Button from "../../ui/Button/Button"

export default function IngredientAddForm() {
  const fields = {
    name: ["Name", "text"],
    brand: ["Marke", "text"],
    unit: ["Einheit", "text"],
    kcal: ["Kalorien", "number"],
    carbs: ["Kohlenhydrate", "number"],
    protein: ["Protein", "number"],
    fat: ["Fett", "number"],
  } // {name: [label, type], ...}

  return (
    <form className={css.form}>
      <div className={css.fieldsWrapper}>
        {Object.keys(fields).map(fieldName => (
          <FormField
            label={fields[fieldName][0]}
            type={fields[fieldName][1]}
            key={fieldName}
          />
        ))}
      </div>
      <div className={css.buttonsWrapper}>
        <Button
          type="positive"
          svg={mdiContentSaveOutline}
          className={css.saveButton}
        />
        <Button type="negative" svg={mdiCancel} className={css.cancelButton} />
      </div>
    </form>
  )
}
