import "./IngredientsGridRow.css"

export default function IngredientsGridRow({ ingredient, fields }) {
  // render row of ingredients grid

  return (
    <div className="ingredients-grid-row">
      {fields.map(fieldName => {
        if (fieldName === "id") {
          return null
        } else {
          return <p key={fieldName}>{fieldName}</p>
        }
      })}
    </div>
  )
}
