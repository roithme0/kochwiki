import "./IngredientField.css"

export default function IngredientsField({ ingredient, fieldName }) {
  if (fieldName === "id") {
    return null
  }
  return (
    <div className="ingredient-field">
      {ingredient[fieldName] ? (
        <p key={fieldName} className="field-value">
          {ingredient[fieldName]}
        </p>
      ) : (
        <p key={fieldName} className="field-value">
          /
        </p>
      )}
    </div>
  )
}
