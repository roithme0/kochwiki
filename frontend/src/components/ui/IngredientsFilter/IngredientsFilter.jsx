import css from "./IngredientsFilter.module.css"

import Button from "../Button"
import { mdiFilterOutline, mdiClose } from "@mdi/js"
import { useEffect, useState } from "react"

export default function IngredientsFilter({ setFilter }) {
  const choices = ["g", "ml", "Stk."]
  const [filterLocal, setFilterLocal] = useState("")

  useEffect(() => {
    // update filter + look of filter field
    setFilter(filterLocal)
    if (filterLocal.length > 0) {
      getLabelElement().classList.add(css.active)
    } else {
      getLabelElement().classList.remove(css.active)
    }
  }, [filterLocal])

  return (
    <label className={css.label} id={css.label}>
      <select
        className={css.selectUnit}
        value={filterLocal}
        id={css.selectUnit}
        onChange={event => {
          setFilterLocal(event.target.value)
        }}
      >
        {/* <option disabled value="">
          Einheit filtern ...
        </option> */}
        <option value="">alle</option>
        {choices.map((choice, index) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </label>
  )
}

function getLabelElement() {
  return document.getElementById(`${css.label}`)
}
