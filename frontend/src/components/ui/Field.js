import "./Field.css"

import InputText from "./InputText"
import InputNumber from "./InputNumber"
import Select from "./Select"

export default function Field({
  label,
  name,
  type,
  maxLength = null,
  options = null,
  required = false,
  initialValue,
  unit = "",
}) {
  const InputComponent =
    type === "text"
      ? InputText
      : type === "number"
      ? InputNumber
      : type === "select"
      ? Select
      : null

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={"input-wrapper " + type}>
        {InputComponent && (
          <InputComponent
            name={name}
            required={required}
            maxLength={maxLength}
            options={options}
            initialValue={initialValue}
          />
        )}
        {type === "number" && <span className="unit">{unit}</span>}
      </div>
    </div>
  )
}
