import "./Select.css"

import { useState } from "react"

export default function InputSelect({
  name,
  choices,
  required = false,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue)
  console.log(choices)
  return (
    <div className="input select">
      <select
        name={name}
        required={required}
        value={value}
        onChange={event => changeHandler(event)}
      >
        {choices.map(choice => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  )

  function changeHandler(event) {
    setValue(event.target.value)
  }
}
