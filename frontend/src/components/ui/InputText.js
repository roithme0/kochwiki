import "./InputText.css"

import { useState } from "react"

export default function InputText({ name, initialValue = "" }) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="input input-text">
      <input
        type="text"
        name={name}
        value={value}
        onChange={event => onChange(event)}
      />
    </div>
  )

  function onChange(event) {
    setValue(event.target.value)
  }
}
