import "./Field.css"

import InputText from "../InputText/InputText"
import InputNumber from "../InputNumber/InputNumber"
import Select from "../Select/Select"

export default function Field({
  label,
  name,
  type,
  fieldErrors = [],
  unit = "",
  ...props
}) {
  const types = {
    text: InputText,
    number: InputNumber,
    select: Select,
  }
  const InputComponent = types[type]

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="input-and-field-error-wrapper">
        <div className={"input-wrapper " + type}>
          {InputComponent && <InputComponent name={name} {...props} />}
          {type === "number" && <span className="unit">{unit}</span>}
        </div>
        {fieldErrors && <FieldError fieldErrors={fieldErrors} />}
      </div>
    </div>
  )

  function FieldError({ fieldErrors }) {
    return fieldErrors.map((fieldError, index) => (
      <span key={index} className="field-error">
        {fieldError}
      </span>
    ))
  }
}
