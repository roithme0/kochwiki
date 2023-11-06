import "./DeleteIngredientPopup.css"

import close from "../../assets/images/mdi/close.png"
import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Button from "../ui/Button"
import NonFieldErrors from "../ui/NonFieldErrors"

import { deleteIngredient } from "../../services/api/Ingredient"

import { useState } from "react"

export default function DeleteIngredientPopup({
  ingredient,
  closeHandler,
  closeHandlerProps = {},
}) {
  const [form, setForm] = useState({
    id: ingredient.id,
    nonFieldErrors: [],
  })
  const [question, setQuestion] = useState(
    ingredient.brand
      ? `${ingredient.name} von ${ingredient.brand} löschen?`
      : `${ingredient.name} löschen?`
  )

  return (
    <div className="edit-ingredient-popup">
      <p className="question">{question}</p>
      <form
        key={form.id}
        onSubmit={event => submitHandler({ event: event })}
        className="form"
      >
        <div className="buttons-wrapper">
          <Button type="positive" img={check} classNames="save-ingredient" />
          <Button
            type="negative"
            img={cancel}
            clickHandler={event => {
              event.preventDefault()
              closeHandler({ closeHandlerProps: closeHandlerProps })
            }}
            classNames="cancel-ingredient"
          />
        </div>
      </form>
    </div>
  )

  function submitHandler({ event }) {
    event.preventDefault()
    deleteIngredient({
      id: form.id,
      callback: closeHandler,
      callbackProps: closeHandlerProps,
      callbackError: updateErrors,
    })
  }

  function updateErrors({ errorResponse }) {
    const errors = errorResponse.data
    const nonFieldErrors =
      "non_field_errors" in errors ? errors.non_field_errors : []
    setForm({ ...form, nonFieldErrors: nonFieldErrors })
  }
}
