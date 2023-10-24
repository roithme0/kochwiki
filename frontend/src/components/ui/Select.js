import "./Select.css"

import { useState } from "react"

export default function InputSelect({
  name,
  options,
  required = false,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="input select">
      <select
        name={name}
        required={required}
        value={value}
        onChange={event => changeHandler(event)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  function changeHandler(event) {
    setValue(event.target.value)
  }
}
