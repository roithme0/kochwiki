import check from "../assets/images/mdi/check.png"
import cancel from "../assets/images/mdi/cancel.png"

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
        <input
          type="text"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          type="text"
          value={brand}
          onChange={event => setBrand(event.target.value)}
        />
        <input
          type="number"
          value={kcal}
          onChange={event => {
            const value = event.target.value
            !isNaN(parseInt(value)) ? setKcal(value) : setKcal(kcal)
          }}
        />
        <input
          type="number"
          value={carbs}
          onChange={event => {
            const value = event.target.value
            !isNaN(parseFloat(value)) ? setCarbs(value) : setCarbs(carbs)
          }}
        />
        <input
          type="number"
          value={protein}
          onChange={event => {
            const value = event.target.value
            !isNaN(parseFloat(value)) ? setProtein(value) : setProtein(protein)
          }}
        />
        <input
          type="number"
          value={fat}
          onChange={event => {
            const value = event.target.value
            !isNaN(parseFloat(value)) ? setFat(value) : setFat(fat)
          }}
        />
      </form>
      <img src={check} className="save-ingredient" />
      <img src={cancel} className="cancel-ingredient" />
    </>
  )
}
