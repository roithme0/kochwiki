import css from "./IngredientAddForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import postIngredient from "../../../services/api/Ingredient/postIngredient"
import { useState } from "react"

export default function IngredientAddForm({
  closeHandler, // :Function -> close popup containing this form
}) {
  // render form to add a new ingredient

  const fields = {
    // fields to display in form with their verbose names and types
    name: { verboseName: "Name", type: "text" },
    brand: { verboseName: "Marke", type: "text" },
    unit: { verboseName: "Einheit", type: "selectUnit" },
    kcal: { verboseName: "Kalorien", type: "number" },
    carbs: { verboseName: "Kohlenhydrate", type: "number" },
    protein: { verboseName: "Protein", type: "number" },
    fat: { verboseName: "Fett", type: "number" },
  }
  const fieldNames = Object.keys(fields)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    unit: "",
    kcal: "",
    carbs: "",
    protein: "",
    fat: "",
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
          callback: ({ createdIngredient }) =>
            closeHandler({ createdIngredient }),
          errorCallback: ({ errorResponse }) =>
            updateErrors({ errorResponse, fieldNames, setFormData }),
        })
      }}
    >
      <div className={css.fieldsWrapper}>
        {fieldNames.map(fieldName => (
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
            closeHandler({ createdIngredient: null }) // null indicates that no ingredient was created
          }}
        />
      </div>
    </form>
  )
}

function submitHandler({ event, formData, callback, errorCallback }) {
  // submit form data to API
  event.preventDefault()
  console.debug("submitting form: ", formData)
  postIngredient({
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
