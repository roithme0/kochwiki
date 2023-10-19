import "./EditIngredient.css"

import check from "../assets/images/mdi/check.png"
import cancel from "../assets/images/mdi/cancel.png"

import Field from "./ui/Field.js"
import Button from "./ui/Button.js"

import { useState } from "react"

export default function EditIngredient(ingredient) {
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
            label={"name"}
            name={"name"}
            type={"text"}
            value={name}
            setValue={setName}
          />
          <Field
            label={"brand"}
            name={"brand"}
            type={"text"}
            value={brand}
            setValue={setBrand}
          />
          <Field
            label={"kcal"}
            name={"kcal"}
            type={"number"}
            value={kcal}
            setValue={setKcal}
          />
          <Field
            label={"carbs"}
            name={"carbs"}
            type={"number"}
            value={carbs}
            setValue={setCarbs}
          />
          <Field
            label={"protein"}
            name={"protein"}
            type={"number"}
            value={protein}
            setValue={setProtein}
          />
          <Field
            label={"fat"}
            name={"fat"}
            type={"number"}
            value={fat}
            setValue={setFat}
          />
        </form>
        <div className="buttons-wrapper">
          <Button
            type={"positive"}
            img={check}
            classNames={"save-ingredient"}
          />
          <Button
            type={"negative"}
            img={cancel}
            classNames={"cancel-ingredient"}
          />
        </div>
      </div>
    </>
  )
}
