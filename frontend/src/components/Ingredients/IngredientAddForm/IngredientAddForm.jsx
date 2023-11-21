import css from "./IngredientAddForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import { useState } from "react"

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
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    unit: "",
    kcal: "",
    carbs: "",
    protein: "",
    fat: "",
    fieldErrors: Object.fromEntries(Object.keys(fields).map(key => [key, []])),
    nonFieldErrors: [],
  })

  return (
    <form
      className={css.form}
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <div className={css.fieldsWrapper}>
        {Object.keys(fields).map(fieldName => (
          <FormField
            label={fields[fieldName]["verboseName"]}
            type={fields[fieldName]["type"]}
            key={fieldName}
            classNameInput={css[fields[fieldName]["type"] + "Input"]}
            value={formData[fieldName]}
            changeHandler={value =>
              setFormData({ ...formData, [fieldName]: value })
            }
            errors={formData.fieldErrors[fieldName]}
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
