import css from "./IngredientUnitSelect.module.css"

import { useState } from "react"

export default function IngredientUnitSelect({
  classNameSelect,
  initialValue,
}) {
  const choices = ["g", "ml", "Stk."]
  const [value, setValue] = useState(initialValue || choices[0])

  return (
    <select
      className={classNameSelect}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      {choices.map(choice => (
        <option key={choice}>{choice}</option>
      ))}
    </select>
  )
}
