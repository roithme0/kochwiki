import css from "./Select.module.css"

import { useState } from "react"

export default function InputSelect({
  name,
  choices,
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
        onChange={event => setValue(event.target.value)}
      >
        {choices.map((choice, index) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  )
}
