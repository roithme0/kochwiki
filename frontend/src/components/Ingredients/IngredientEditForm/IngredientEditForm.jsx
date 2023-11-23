import css from "./IngredientEditForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import putIngredient from "../../../services/api/Ingredient/putIngredient"
import { useState, useEffect } from "react"

export default function IngredientEditForm({
  initialIngredient, // :Object -> ingredient to edit
  closeHandler, // :Function -> close popup containing this form
}) {
  // render form to edit an existing ingredient

  const fieldTypes = {
    // fields to display in the form with their input types
    name: "text",
    brand: "text",
    unit: "selectUnit",
    kcal: "number",
    carbs: "number",
    protein: "number",
    fat: "number",
  }
  const fieldNames = Object.keys(fieldTypes)
  const [formData, setFormData] = useState({
    id: initialIngredient.id,
    name: initialIngredient.name,
    brand: initialIngredient.brand,
    unit: initialIngredient.unit,
    kcal: initialIngredient.kcal,
    carbs: initialIngredient.carbs,
    protein: initialIngredient.protein,
    fat: initialIngredient.fat,
    fieldErrors: Object.fromEntries(fieldNames.map(key => [key, []])),
    nonFieldErrors: [],
  })

  return (
    <form
      className={css.form}
      onSubmit={event => {
        submitHandler({
          event,
          formData,
          callback: ({ updatedIngredient }) =>
            closeHandler({ updatedIngredient }),
          errorCallback: ({ errorResponse }) =>
            updateErrors({ errorResponse, fieldNames, setFormData }),
        })
      }}
    >
      <div className={css.fieldsWrapper}>
        {fieldNames.map(fieldName => (
          <FormField
            label={initialIngredient.verbose_names[fieldName]}
            type={fieldTypes[fieldName]}
            key={fieldName}
            classNameInput={css[fieldTypes[fieldName] + "Input"]}
            classNameInputHasChanged={css.hasChanged}
            value={formData[fieldName]}
            initialValue={initialIngredient[fieldName]}
            changeHandler={value =>
              setFormData({ ...formData, [fieldName]: value })
            }
            errors={formData.fieldErrors[fieldName]}
          />
        ))}
      </div>
      {formData.nonFieldErrors.length > 0 && (
        <div className={css.nonFieldErrorsWrapper}>
          {formData.nonFieldErrors.map(nonFieldError => (
            <p key={nonFieldError} className={css.nonFieldError}>
              {nonFieldError}
            </p>
          ))}
        </div>
      )}
      <div className={css.buttonsWrapper}>
        <Button type="positive" svg={mdiCheck} className={css.saveButton} />
        <Button
          type="negative"
          svg={mdiCancel}
          className={css.cancelButton}
          clickHandler={event => {
            event.preventDefault()
            closeHandler({ updatedIngredient: null })
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
  putIngredient({
    form: formData,
    callback,
    errorCallback,
  })
}

function updateErrors({ errorResponse, fieldNames, setFormData }) {
  // update form errors
  console.debug("updating form errors: ", errorResponse.data)
  const nonFieldErrors = errorResponse.data.non_field_errors || []
  const fieldErrors = Object.fromEntries(
    fieldNames.map(key => [key, errorResponse.data[key] || []])
  )
  console.warn("fieldErrors: ", fieldErrors)
  console.warn("nonFieldErrors: ", nonFieldErrors)
  setFormData(formData => ({ ...formData, fieldErrors, nonFieldErrors }))
}
