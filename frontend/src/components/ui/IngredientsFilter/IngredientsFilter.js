import css from "./IngredientsFilter.module.css"

export default function IngredientsFilter({ setFilter }) {
  const choices = ["g", "ml", "Stk."]

  return (
    <label className={css.label}>
      <select
        className={css.selectUnit}
        defaultValue=""
        onChange={event => {
          setFilter(event.target.value)
        }}
      >
        <option disabled value="">
          Einheit filtern ...
        </option>
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
