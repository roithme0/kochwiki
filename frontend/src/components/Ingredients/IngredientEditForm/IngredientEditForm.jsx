import css from "./IngredientEditForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import putIngredient from "../../../services/api/Ingredient/putIngredient"
import { useState } from "react"

export default function IngredientEditForm({
  initialIngredient,
  closeHandler,
}) {
  const fieldTypes = {
    name: "text",
    brand: "text",
    unit: "selectUnit",
    kcal: "number",
    carbs: "number",
    protein: "number",
    fat: "number",
  }
  const [formData, setFormData] = useState({
    id: initialIngredient.id,
    name: initialIngredient.name,
    brand: initialIngredient.brand,
    unit: initialIngredient.unit,
    kcal: initialIngredient.kcal,
    carbs: initialIngredient.carbs,
    protein: initialIngredient.protein,
    fat: initialIngredient.fat,
  })

  return (
    <form
      className={css.form}
      onSubmit={event => {
        submitHandler({ event, formData })
        closeHandler()
      }}
    >
      <div className={css.fieldsWrapper}>
        {Object.keys(fieldTypes).map(fieldName => (
          <FormField
            label={initialIngredient.verbose_names[fieldName]}
            type={fieldTypes[fieldName]}
            key={fieldName}
            classNameInput={css[fieldTypes[fieldName] + "Input"]}
            value={formData[fieldName]}
            setValue={value => setFormData({ ...formData, [fieldName]: value })}
          />
        ))}
      </div>
      <div className={css.buttonsWrapper}>
        <Button type="positive" svg={mdiCheck} className={css.saveButton} />
        <Button
          type="negative"
          svg={mdiCancel}
          className={css.cancelButton}
          clickHandler={event => {
            event.preventDefault()
            closeHandler()
          }}
        />
      </div>
    </form>
  )
}

function submitHandler({ event, formData, callback, errorCallback }) {
  event.preventDefault()
  console.debug("submitting form: ", formData)
  putIngredient({ form: formData })
}
