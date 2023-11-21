import css from "./IngredientDeleteForm.module.css"

import { mdiCheck, mdiCancel } from "@mdi/js"
import Button from "../../ui/Button"
import { useState } from "react"
import deleteIngredient from "../../../services/api/Ingredient/deleteIngredient"

export default function IngredientDeleteForm({ ingredient, closeHandler }) {
  const [formData, setFormData] = useState({
    id: ingredient.id,
  })

  return (
    <form
      className={css.form}
      onSubmit={event => {
        submitHandler({
          event,
          formData,
          callback: closeHandler,
        })
      }}
    >
      <input type="hidden" name="id" value={ingredient.id} />
      {/* {formData.nonFieldErrors.length > 0 && (
        <div className={css.nonFieldErrorsWrapper}>
          {formData.nonFieldErrors.map(nonFieldError => (
            <p key={nonFieldError} className={css.nonFieldError}>
              {nonFieldError}
            </p>
          ))}
        </div>
      )} */}
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

async function submitHandler({
  event,
  formData,
  callback,
  // errorCallback,
  // errorCallbackProps,
}) {
  // submit form data to API
  event.preventDefault()
  console.debug("submitting form: ", formData)
  const result = await deleteIngredient({
    id: formData.id,
    // errorCallback,
    // errorCallbackProps,
  })
  result.success &&
    callback({ deletedIngredientID: result.deletedIngredientID })
}
