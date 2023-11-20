import css from "./IngredientUnitSelect.module.css"

export default function IngredientUnitSelect({ classNameSelect }) {
  const choices = ["g", "ml", "Stk."]

  return (
    <select className={classNameSelect}>
      {choices.map(choice => (
        <option key={choice}>{choice}</option>
      ))}
    </select>
  )
}
