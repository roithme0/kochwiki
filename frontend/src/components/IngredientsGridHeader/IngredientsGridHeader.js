import "./IngredientsGridHeader.css"

export default function IngredientsGridHeader({ verboseNames }) {
  return (
    <div className="ingredients-grid-header">
      {Object.entries(verboseNames).map(([key, value]) => {
        if (key === "id") {
          return null
        } else {
          return <p key={key}>{value}</p>
        }
      })}
    </div>
  )
}
