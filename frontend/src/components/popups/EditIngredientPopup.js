import "./EditIngredientPopup.css"

import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field"
import Button from "../ui/Button"

import { putIngredient } from "../../services/api/Ingredient"

import { useState } from "react"

export default function EditIngredientPopup({ closePopup, ingredient }) {
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
    fieldErrors: ingredient.field_errors,
  })

  return (
    <>
      <div className="edit-ingredient">
        <form
          key={ingredient.id}
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
            />
            <Field
              label={verbose_names.brand}
              name="brand"
              type="text"
              maxLength={maxLength.brand}
              required={!blankFields.brand}
              initialValue={form.brand}
            />
            <Field
              label={verbose_names.kcal}
              name="kcal"
              type="number"
              required={!blankFields.kcal}
              initialValue={form.kcal}
              unit="kcal"
            />
            <Field
              label={verbose_names.carbs}
              name="carbs"
              type="number"
              required={!blankFields.carbs}
              initialValue={form.carbs}
              float={true}
              unit="g"
            />
            <Field
              label={verbose_names.protein}
              name="protein"
              type="number"
              required={!blankFields.protein}
              initialValue={form.protein}
              float={true}
              unit="g"
            />
            <Field
              label={verbose_names.fat}
              name="fat"
              type="number"
              required={!blankFields.fat}
              initialValue={form.fat}
              float={true}
              unit="g"
            />
            <Field
              label={verbose_names.unit}
              name="unit"
              type="select"
              choices={choices.unit}
              required={!blankFields.unit}
              initialValue={form.unit}
            />
          </div>
          <div className="buttons-wrapper">
            <Button type="positive" img={check} classNames="save-ingredient" />
            <Button
              type="negative"
              img={cancel}
              clickHandler={event => closePopup({ event })}
              classNames="cancel-ingredient"
            />
          </div>
        </form>
      </div>
    </>
  )

  function changeHandler({ event }) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function submitHandler({ event }) {
    event.preventDefault()
    putIngredient({ form: form, callback: closePopup })
  }
}
