import "./IngredientsGridRow.css"

export default function IngredientsGridRow({ ingredient, key }) {
  return (
    <div key={key} className="ingredients-grid-row">
      {Object.keys(ingredient.verbose_names).map(fieldName => {
        if (fieldName === "id") {
          return null
        } else {
          return <p>{fieldName}</p>
        }
      })}
    </div>
  )
}
