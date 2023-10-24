import "./Field.css"

import InputText from "./InputText"
import InputNumber from "./InputNumber"
import Select from "./Select"

export default function Field({ label, name, type, unit = "", ...props }) {
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
        {InputComponent && <InputComponent name={name} {...props} />}
        {type === "number" && <span className="unit">{unit}</span>}
      </div>
    </div>
  )
}
