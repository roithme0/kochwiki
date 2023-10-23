import "./EditIngredientPopup.css"

import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field.js"
import Button from "../ui/Button.js"

import { useState } from "react"

export default function EditIngredientPopup({ closePopup, ingredient }) {
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
          onChange={event => changeHandler(event)}
          onSubmit={event => submitHandler(event)}
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
              clickHandler={closePopup}
              classNames={"cancel-ingredient"}
            />
          </div>
        </form>
      </div>
    </>
  )

  function changeHandler(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function submitHandler(event) {
    event.preventDefault()
    fetch(`http://localhost:8000/recipes/ingredient/update/${ingredient.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        closePopup()
      })
      .catch(error => console.error(error))
  }
}
