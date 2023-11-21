import css from "./IngredientUnitSelect.module.css"

export default function IngredientUnitSelect({
  classNameSelect,
  value = "",
  changeHandler = () => {},
  refValue = null,
}) {
  const choices = ["g", "ml", "Stk."]

  return (
    <select
      className={classNameSelect}
      value={value}
      ref={refValue}
      onChange={event => changeHandler(event.target.value)}
    >
      <option disabled value="">
        Einheit wählen ...
      </option>
      {choices.map(choice => (
        <option key={choice}>{choice}</option>
      ))}
    </select>
  )
}
