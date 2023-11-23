import css from "./IngredientDeleteForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import Button from "../../ui/Button"
import { useState } from "react"
import deleteIngredient from "../../../services/api/Ingredient/deleteIngredient"

const fieldNames = [
  // fields to display in form
  "name",
  "brand",
  "kcal",
  "carbs",
  "protein",
  "fat",
  "unit",
]

export default function IngredientDeleteForm({
  ingredient, // Object -> ingredient to delete
  closeHandler, // Function -> close popup containing this form
}) {
  // render for to delete an ingredient

  const [formData, setFormData] = useState({
    id: ingredient.id,
    errorDetail: "",
  })

  return (
    <form
      className={css.form}
      onSubmit={event => {
        submitHandler({
          event,
          formData,
          callback: ({ deletedIngredientID }) =>
            closeHandler({ deletedIngredientID }),
          errorCallback: ({ errorResponse }) =>
            updateErrorDetail({ errorResponse, setFormData }),
        })
      }}
    >
      <input type="hidden" name="id" value={ingredient.id} />
      <div className={css.fieldsWrapper}>
        {fieldNames.map(fieldName => (
          <label key={fieldName} className={css.fieldLabel}>
            <p className={css.labelText}>
              {ingredient.verbose_names[fieldName]}
            </p>
            <p className={css.fieldValue}>{ingredient[fieldName] || "-"}</p>
          </label>
        ))}
      </div>
      {formData.errorDetail.length > 0 && (
        <p className={css.errorDetail}>{formData.errorDetail}</p>
      )}
      <div className={css.buttonsWrapper}>
        <Button type="positive" svg={mdiCheck} className={css.deleteButton} />
        <Button
          type="negative"
          svg={mdiCancel}
          className={css.cancelButton}
          clickHandler={event => {
            event.preventDefault()
            closeHandler({ deletedIngredientID: null })
          }}
        />
      </div>
    </form>
  )
}

function submitHandler({ event, formData, callback, errorCallback }) {
  // submit form data to api
  event.preventDefault()
  console.debug("submitting form: ", formData)
  deleteIngredient({
    id: formData.id,
    callback,
    errorCallback,
  })
}

function updateErrorDetail({ errorResponse, setFormData }) {
  // update error detail
  console.debug("updating error details: ", errorResponse.data)
  const errorDetail = errorResponse.data.detail || ""
  setFormData(formData => ({ ...formData, errorDetail }))
}
