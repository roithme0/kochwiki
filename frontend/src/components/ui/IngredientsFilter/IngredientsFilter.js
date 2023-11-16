import css from "./IngredientsFilter.module.css"

export default function IngredientsFilter({ setFilter }) {
  const choices = ["g", "ml", "Stk."]

  return (
    <select className={css.selectUnit} defaultValue="">
      <option value="">alle</option>
      {choices.map((choice, index) => (
        <option key={index} value={choice}>
          {choice}
        </option>
      ))}
    </select>
  )
}
