import "./EditIngredient.css"

import check from "../assets/images/mdi/check.png"
import cancel from "../assets/images/mdi/cancel.png"

import Field from "./ui/Field.js"
import Button from "./ui/Button.js"

import { useState } from "react"

export default function EditIngredient({ submitEdit, cancelEdit, ingredient }) {
  const [name, setName] = useState(ingredient.name)
  const [brand, setBrand] = useState(ingredient.brand ? ingredient.brand : "")
  const [kcal, setKcal] = useState(ingredient.kcal ? ingredient.kcal : "")
  const [carbs, setCarbs] = useState(ingredient.carbs ? ingredient.carbs : "")
  const [protein, setProtein] = useState(
    ingredient.protein ? ingredient.protein : ""
  )
  const [fat, setFat] = useState(ingredient.fat ? ingredient.fat : "")

  return (
    <>
      <div className="edit-ingredient">
        <form key={ingredient.id} className="ingredient-form">
          <Field
            label={"Name"}
            name={"name"}
            type={"text"}
            value={name}
            setValue={setName}
          />
          <Field
            label={"Marke"}
            name={"brand"}
            type={"text"}
            value={brand}
            setValue={setBrand}
          />
          <Field
            label={"Kalorien"}
            name={"kcal"}
            type={"number"}
            value={kcal}
            setValue={setKcal}
            unit={"kcal"}
          />
          <Field
            label={"Kohlenhydrate"}
            name={"carbs"}
            type={"number"}
            value={carbs}
            setValue={setCarbs}
            unit={"g"}
          />
          <Field
            label={"Protein"}
            name={"protein"}
            type={"number"}
            value={protein}
            setValue={setProtein}
            unit={"g"}
          />
          <Field
            label={"Fett"}
            name={"fat"}
            type={"number"}
            value={fat}
            setValue={setFat}
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
}
