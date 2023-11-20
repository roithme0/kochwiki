import css from "./FormField.module.css"

import IngredientUnitSelect from "../IngredientUnitSelect"
import { useState } from "react"

export default function FormField({
  label,
  type,
  classNameInput,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <>
      <label className={css.label}>{label}</label>
      {type === "selectUnit" ? (
        <IngredientUnitSelect classNameSelect={classNameInput} />
      ) : (
        <input
          type={type}
          className={classNameInput}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      )}
    </>
  )
}
