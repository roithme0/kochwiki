import "./Field.css"

import InputText from "./InputText"
import InputNumber from "./InputNumber"
import Select from "./Select"

export default function Field({ label, name, type, unit = "", ...props }) {
  const types = {
    text: InputText,
    number: InputNumber,
    select: Select,
  }
  const InputComponent = types[type]

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
