import css from "./IngredientsFilter.module.css"

import { useEffect, useState, useRef } from "react"

const choices = ["g", "ml", "Stk."]

export default function IngredientsFilter({
  setFilter, // Function -> set filter value
}) {
  const [filterLocal, setFilterLocal] = useState("")
  const labelRef = useRef(null)

  useEffect(() => {
    // update filter + look of filter field
    setFilter(filterLocal)
    if (filterLocal.length > 0) {
      labelRef.current.classList.add(css.active)
    } else {
      labelRef.current.classList.remove(css.active)
    }
  }, [filterLocal])

  return (
    <label className={css.label} ref={labelRef}>
      <select
        className={css.selectUnit}
        value={filterLocal}
        id={css.selectUnit}
        onChange={event => {
          setFilterLocal(event.target.value)
        }}
      >
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
