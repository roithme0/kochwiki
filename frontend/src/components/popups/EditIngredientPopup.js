import "./EditIngredientPopup.css"

import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field.js"
import Button from "../ui/Button.js"

import { useState } from "react"

export default function EditIngredientPopup({
  submitEdit,
  cancelEdit,
  ingredient,
}) {
  const [form, setForm] = useState({
    name: ingredient.name,
    brand: ingredient.brand ? ingredient.brand : "",
    kcal: ingredient.kcal ? ingredient.kcal : "",
    carbs: ingredient.carbs ? ingredient.carbs : "",
    protein: ingredient.protein ? ingredient.protein : "",
    fat: ingredient.fat ? ingredient.fat : "",
  })

  return (
    <>
      <div className="edit-ingredient">
        <form
          key={ingredient.id}
          className="ingredient-form"
          onChange={event => onChange(event)}
        >
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
        </form>
        <div className="buttons-wrapper">
          <Button
            type={"positive"}
            img={check}
            onClick={submitEdit}
            classNames={"save-ingredient"}
          />
          <Button
            type={"negative"}
            img={cancel}
            onClick={cancelEdit}
            classNames={"cancel-ingredient"}
          />
        </div>
      </div>
    </>
  )

  function onChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
}
