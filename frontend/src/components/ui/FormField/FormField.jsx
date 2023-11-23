import css from "./FormField.module.css"

import IngredientUnitSelect from "../inputFields/IngredientUnitSelect"
import InputText from "../inputFields/InputText"
import InputInteger from "../inputFields/InputInteger"
import InputFloat from "../inputFields/InputFloat"
import { useEffect, useRef } from "react"

export default function FormField({
  label, // String -> label of field
  type, // String -> type of input field
  classNameInput, // String -> css className of input field
  classNameInputHasChanged = css.dummy, // css.class -> css className of input field after value has changed
  value, // String -> value of input field
  initialValue = value, // String -> initial value of input field
  changeHandler, // Function -> change handler of input field
  errors = [], // Array<String> -> field errors of input field
}) {
  const inputRef = useRef(null)
  const fields = {
    text: InputText,
    integer: InputInteger,
    float: InputFloat,
    selectUnit: IngredientUnitSelect,
  }
  const Field = fields[type]

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
        <Field
          className={classNameInput}
          value={value || ""}
          changeHandler={value => changeHandler(value)}
          refValue={inputRef}
        />
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
