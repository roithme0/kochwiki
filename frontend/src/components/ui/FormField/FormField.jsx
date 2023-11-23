import css from "./FormField.module.css"

import IngredientUnitSelect from "../inputFields/IngredientUnitSelect"
import { useEffect, useRef } from "react"

export default function FormField({
  label, // String -> label of field
  type, // String -> type of input field
  classNameInput, // String -> css className of input field
  classNameInputHasChanged = null, // String -> css className of input field after value has changed
  value, // String -> value of input field
  initialValue = value, // String -> initial value of input field
  changeHandler, // Function -> change handler of input field
  errors = [], // Array<String> -> field errors of input field
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    // indicate if field has errors
    if (inputRef.current) {
      if (errors.length > 0) {
        inputRef.current.classList.add(css.hasErrors)
      } else {
        inputRef.current.classList.remove(css.hasErrors)
      }
    }
  }, [errors])

  useEffect(() => {
    // indicate if the fields value was changed
    if (inputRef.current) {
      if (value !== initialValue) {
        inputRef.current.classList.add(classNameInputHasChanged)
      } else {
        inputRef.current.classList.remove(classNameInputHasChanged)
      }
    }
  }, [initialValue, value])

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
