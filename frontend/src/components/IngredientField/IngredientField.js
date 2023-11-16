import "./IngredientField.css"

export default function IngredientsField({ ingredient, fieldName }) {
  // render value of ingredient field

  if (fieldName === "id") {
    return null
  }
  return (
    <div className="ingredient-field">
      {ingredient[fieldName] ? (
        <p className="field-value">{ingredient[fieldName]}</p>
      ) : (
        <p key={fieldName} className="field-value">
          /
        </p>
      )}
    </div>
  )
}
