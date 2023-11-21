import css from "./FormField.module.css"

import IngredientUnitSelect from "../IngredientUnitSelect"

export default function FormField({
  label,
  type,
  classNameInput,
  value,
  setValue,
  errors = [],
}) {
  return (
    <>
      <label className={css.label}>{label}</label>
      <div className={css.fieldAndErrors}>
        {type === "selectUnit" ? (
          <IngredientUnitSelect classNameSelect={classNameInput} />
        ) : (
          <input
            type={type}
            className={classNameInput}
            value={value || ""}
            onChange={event => setValue(event.target.value)}
          />
        )}
        {errors.length > 0 &&
          errors.map((error, index) => (
            <p key={index} className={css.error}>
              {error}
            </p>
          ))}
      </div>
    </>
  )
}
