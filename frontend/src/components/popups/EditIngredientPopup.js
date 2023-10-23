import "./EditIngredientPopup.css"

import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field"
import Button from "../ui/Button"

import { putIngredient } from "../../services/api/Ingredient"

import { useState } from "react"

export default function EditIngredientPopup({ closePopup, ingredient }) {
  const [form, setForm] = useState({
    id: ingredient.id,
    name: ingredient.name,
    brand: ingredient.brand ? ingredient.brand : "",
    kcal: ingredient.kcal ? ingredient.kcal : "",
    carbs: ingredient.carbs ? ingredient.carbs : "",
    protein: ingredient.protein ? ingredient.protein : "",
    fat: ingredient.fat ? ingredient.fat : "",
    labels: ingredient.labels,
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
              label={"Name"}
              name={"name"}
              type={"text"}
              initialValue={form.name}
            />
            <Field
              label={"Marke"}
              name={"brand"}
              type={"text"}
              initialValue={form.brand}
            />
            <Field
              label={"Kalorien"}
              name={"kcal"}
              type={"number"}
              initialValue={form.kcal}
              unit={"kcal"}
            />
            <Field
              label={"Kohlenhydrate"}
              name={"carbs"}
              type={"number"}
              initialValue={form.carbs}
              unit={"g"}
            />
            <Field
              label={"Protein"}
              name={"protein"}
              type={"number"}
              initialValue={form.protein}
              unit={"g"}
            />
            <Field
              label={"Fett"}
              name={"fat"}
              type={"number"}
              initialValue={form.fat}
              unit={"g"}
            />
          </div>
          <div className="buttons-wrapper">
            <Button
              type={"positive"}
              img={check}
              classNames={"save-ingredient"}
            />
            <Button
              type={"negative"}
              img={cancel}
              clickHandler={event => closePopup({ event })}
              classNames={"cancel-ingredient"}
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
