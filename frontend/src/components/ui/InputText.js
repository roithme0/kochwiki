import "./Input.css"
import "./InputText.css"

import { useState } from "react"

export default function InputText({
  name,
  maxLength,
  required = false,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="input input-text">
      <input
        type="text"
        name={name}
        maxLength={maxLength}
        // required={required}
        value={value}
        onChange={event => changeHandler(event)}
      />
    </div>
  )

  function changeHandler(event) {
    setValue(event.target.value)
  }
}
