import "./Input.css"
import "./InputNumber.css"

import { isNumericKeyCode, isFunctionalKeyCode } from "../../utils/ASCII.js"

import { useState } from "react"

export default function InputNumber({
  name,
  required = false,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="input input-number">
      <input
        type="number"
        name={name}
        required={required}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  )

  function onKeyDown(event) {
    const charCode = event.which
    if (!isNumericKeyCode(charCode) && !isFunctionalKeyCode(charCode)) {
      event.preventDefault()
    }
  }

  function onChange(event) {
    const newValue = event.target.value
    setValue(newValue)
  }
}
