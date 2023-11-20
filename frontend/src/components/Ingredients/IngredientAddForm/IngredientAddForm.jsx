import css from "./IngredientAddForm.module.css"

import { mdiContentSaveOutline, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"

export default function IngredientAddForm() {
  const fields = {
    name: { verboseName: "Name", type: "text" },
    brand: { verboseName: "Marke", type: "text" },
    unit: { verboseName: "Einheit", type: "selectUnit" },
    kcal: { verboseName: "Kalorien", type: "number" },
    carbs: { verboseName: "Kohlenhydrate", type: "number" },
    protein: { verboseName: "Protein", type: "number" },
    fat: { verboseName: "Fett", type: "number" },
  }

  return (
    <form className={css.form}>
      <div className={css.fieldsWrapper}>
        {Object.keys(fields).map(fieldName => (
          <FormField
            label={fields[fieldName]["verboseName"]}
            type={fields[fieldName]["type"]}
            key={fieldName}
            classNameInput={css[fields[fieldName]["type"] + "Input"]}
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