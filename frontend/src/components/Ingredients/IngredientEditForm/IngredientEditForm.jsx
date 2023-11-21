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
          callback: closeHandler,
          errorCallback: updateErrors,
          errorCallbackProps: { fieldNames, setFormData },
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
            value={formData[fieldName]}
            setValue={value => setFormData({ ...formData, [fieldName]: value })}
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
            closeHandler()
          }}
        />
      </div>
    </form>
  )
}

function submitHandler({
  event,
  formData,
  callback,
  errorCallback,
  errorCallbackProps,
}) {
  // submit form data to API
  event.preventDefault()
  console.debug("submitting form: ", formData)
  putIngredient({ form: formData, callback, errorCallback, errorCallbackProps })
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
