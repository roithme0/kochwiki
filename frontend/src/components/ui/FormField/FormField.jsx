import css from "./FormField.module.css"

import IngredientUnitSelect from "../IngredientUnitSelect"

export default function FormField({ label, type, classNameInput }) {
  return (
    <>
      <label className={css.label}>{label}</label>
      {type === "selectUnit" && (
        <IngredientUnitSelect classNameSelect={classNameInput} />
      )}
      {type !== "selectUnit" && (
        <input type={type} className={classNameInput} />
      )}
    </>
  )
}
