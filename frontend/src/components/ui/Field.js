import "./Field.css"

import InputText from "./InputText"
import InputNumber from "./InputNumber"

export default function Field({
  label,
  name,
  type,
  value,
  setValue,
  unit = "",
}) {
  const InputComponent =
    type === "text" ? InputText : type === "number" ? InputNumber : null

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={"input-wrapper " + type}>
        {InputComponent && (
          <InputComponent name={name} value={value} setValue={setValue} />
        )}
        {type === "number" && <span className="unit">{unit}</span>}
      </div>
    </div>
  )
}
