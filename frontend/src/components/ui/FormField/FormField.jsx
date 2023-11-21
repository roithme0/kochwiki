import css from "./FormField.module.css"

import IngredientUnitSelect from "../IngredientUnitSelect"
import { useEffect, useRef } from "react"

export default function FormField({
  label,
  type,
  classNameInput,
  value,
  changeHandler,
  errors = [],
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    // indicate if field has errors
    if (inputRef.current) {
      if (errors.length > 0) {
        inputRef.current.classList.add(css.hasErrors)
        inputRef.current.scrollIntoView({ behavior: "smooth" })
        inputRef.current.focus()
      } else {
        inputRef.current.classList.remove(css.hasErrors)
      }
    }
  }, [errors])

  useEffect(() => {
    // remove error indication when value changes
    if (inputRef.current) {
      inputRef.current.classList.remove(css.hasErrors)
    }
  }, [value])

  return (
    <>
      <label className={css.label}>{label}</label>
      <div className={css.fieldAndErrors}>
        {type === "selectUnit" ? (
          <IngredientUnitSelect
            classNameSelect={classNameInput}
            value={value || ""}
            changeHandler={value => changeHandler(value)}
            refValue={inputRef}
          />
        ) : (
          <input
            type={type}
            className={classNameInput}
            value={value || ""}
            ref={inputRef}
            onChange={event => changeHandler(event.target.value)}
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
