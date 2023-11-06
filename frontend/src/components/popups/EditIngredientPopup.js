import "./EditIngredientPopup.css"

import close from "../../assets/images/mdi/close.png"
import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field"
import NonFieldErrors from "../ui/NonFieldErrors"
import Button from "../ui/Button"

import { putIngredient } from "../../services/api/Ingredient"

import { useState } from "react"

export default function EditIngredientPopup({
  title,
  ingredient,
  closeHandler,
  closeHandlerProps = {},
}) {
  const verbose_names = ingredient.verbose_names
  const blankFields = ingredient.blank_fields
  const maxLength = ingredient.max_length
  const choices = ingredient.choices

  const [form, setForm] = useState({
    id: ingredient.id,
    name: ingredient.name,
    brand: ingredient.brand ? ingredient.brand : "",
    kcal: ingredient.kcal ? ingredient.kcal : "",
    carbs: ingredient.carbs ? ingredient.carbs : "",
    protein: ingredient.protein ? ingredient.protein : "",
    fat: ingredient.fat ? ingredient.fat : "",
    unit: ingredient.unit,
    fieldErrors: {},
    nonFieldErrors: {},
  })

  return (
    <div className="edit-ingredient-popup">
      <div className="header">
        <h2 className="title">{title}</h2>
        <Button
          type={"neutral"}
          img={close}
          clickHandler={() =>
            closeHandler({ closeHandlerProps: closeHandlerProps })
          }
          classNames={"close"}
        />
      </div>
      <form
        key={form.id}
        onChange={event => changeHandler({ event })}
        onSubmit={event => submitHandler({ event })}
        className="ingredient-form"
      >
        <div className="fields-wrapper">
          <Field
            label={verbose_names.name}
            name="name"
            type="text"
            maxLength={maxLength.name}
            required={!blankFields.name}
            initialValue={form.name}
            fieldErrors={
              "name" in form.fieldErrors ? form.fieldErrors.name : []
            }
          />
          <Field
            label={verbose_names.brand}
            name="brand"
            type="text"
            maxLength={maxLength.brand}
            required={!blankFields.brand}
            initialValue={form.brand}
            fieldErrors={
              "brand" in form.fieldErrors ? form.fieldErrors.brand : []
            }
          />
          <Field
            label={verbose_names.unit}
            name="unit"
            type="select"
            choices={choices.unit}
            required={!blankFields.unit}
            initialValue={form.unit}
            fieldErrors={
              "unit" in form.fieldErrors ? form.fieldErrors.unit : []
            }
          />
          <Field
            label={verbose_names.kcal}
            name="kcal"
            type="number"
            required={!blankFields.kcal}
            initialValue={form.kcal}
            unit="kcal"
            fieldErrors={
              "kcal" in form.fieldErrors ? form.fieldErrors.kcal : []
            }
          />
          <Field
            label={verbose_names.carbs}
            name="carbs"
            type="number"
            required={!blankFields.carbs}
            initialValue={form.carbs}
            float={true}
            unit="g"
            fieldErrors={
              "carbs" in form.fieldErrors ? form.fieldErrors.carbs : []
            }
          />
          <Field
            label={verbose_names.protein}
            name="protein"
            type="number"
            required={!blankFields.protein}
            initialValue={form.protein}
            float={true}
            unit="g"
            fieldErrors={
              "protein" in form.fieldErrors ? form.fieldErrors.protein : []
            }
          />
          <Field
            label={verbose_names.fat}
            name="fat"
            type="number"
            required={!blankFields.fat}
            initialValue={form.fat}
            float={true}
            unit="g"
            fieldErrors={"fat" in form.fieldErrors ? form.fieldErrors.fat : []}
          />
        </div>
        {form.nonFieldErrors.length > 0 && (
          <NonFieldErrors nonFieldErrors={form.nonFieldErrors} />
        )}
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

  function changeHandler({ event }) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function submitHandler({ event }) {
    event.preventDefault()
    putIngredient({
      form: form,
      callback: closeHandler,
      callbackProps: closeHandlerProps,
      callbackError: updateErrors,
    })
  }

  function updateErrors({ errorResponse }) {
    const errors = errorResponse.data
    const fieldErrors = "field_errors" in errors ? errors.field_errors : {}
    const nonFieldErrors =
      "non_field_errors" in errors ? errors.non_field_errors : []
    setForm({
      ...form,
      fieldErrors: fieldErrors,
      nonFieldErrors: nonFieldErrors,
    })
  }
}
