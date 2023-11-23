import css from "./IngredientUnitSelect.module.css"

export default function IngredientUnitSelect({
  classNameSelect, // String -> css className of select field
  value = "", // String -> value of select field
  changeHandler = () => {}, // Function -> change handler of select field
  refValue = null, // Ref -> ref of select field
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
