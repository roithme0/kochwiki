import "./IngredientsGridHeader.css"

export default function IngredientsGridHeader({ verboseNames }) {
  // render header of ingredients grid

  const verboseNamesCopy = { ...verboseNames }
  delete verboseNamesCopy["id"]
  const headerFields = Object.entries(verboseNamesCopy)

  return (
    <div className="ingredients-grid-header">
      {headerFields.map(([fieldName, verboseName]) => (
        <p key={fieldName} className="header-field">
          {verboseName}
        </p>
      ))}
    </div>
  )
}
