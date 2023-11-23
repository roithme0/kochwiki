import css from "./IngredientUnitSelect.module.css"

const choices = ["g", "ml", "Stk."]

export default function IngredientUnitSelect({
  className, // String -> css className of select field
  value = "", // String -> value of select field
  changeHandler = () => {}, // Function -> change handler of select field
  refValue = null, // Ref -> ref of select field
}) {
  return (
    <select
      className={className}
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
