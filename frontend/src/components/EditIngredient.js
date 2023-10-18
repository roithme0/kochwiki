import check from "../assets/images/mdi/check.png"
import cancel from "../assets/images/mdi/cancel.png"

import InputText from "./ui/InputText.js"
import InputNumber from "./ui/InputNumber.js"

import { useState } from "react"

export default function EditIngredient({ ingredient }) {
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
      <form key={ingredient.id} className="ingredient">
        <InputText value={name} setValue={setName} />
        <InputText value={brand} setValue={setBrand} />
        <InputNumber value={kcal} setValue={setKcal} />
        <InputNumber value={carbs} setValue={setCarbs} />
        <InputNumber value={protein} setValue={setProtein} />
        <InputNumber value={fat} setValue={setFat} />
      </form>
      <img src={check} className="save-ingredient" />
      <img src={cancel} className="cancel-ingredient" />
    </>
  )
}
