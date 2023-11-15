import "../Input.css"
import "./InputNumber.css"

import {
  isIntegerKeyCode,
  isFloatKeyCode,
  isFunctionalKeyCode,
} from "../../../utils/ASCII.js"

import { useState } from "react"

export default function InputNumber({
  name,
  required = false,
  initialValue = "",
  float = false,
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="input input-number">
      <input
        type="number"
        name={name}
        required={required}
        value={value}
        onKeyDown={keyDownHandler}
        onChange={changeHandler}
      />
    </div>
  )

  function keyDownHandler(event) {
    const charCode = event.which
    if (!isIntegerKeyCode(charCode) && !isFunctionalKeyCode(charCode)) {
      if (!float) {
        event.preventDefault()
      } else {
        if (!isFloatKeyCode(charCode)) {
          event.preventDefault()
        }
      }
    }
  }

  function changeHandler(event) {
    const newValue = event.target.value
    setValue(newValue)
  }
}
