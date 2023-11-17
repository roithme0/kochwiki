import css from "./IngredientField.module.css"

export default function IngredientField({ ingredient, fieldName }) {
  // render value of ingredient field

  if (fieldName === "id") {
    return null
  }
  if (ingredient[fieldName]) {
    return <p className={css.fieldValue}>{ingredient[fieldName]}</p>
  } else {
    return (
      <p key={fieldName} className={css.fieldValue}>
        /
      </p>
    )
  }
}
