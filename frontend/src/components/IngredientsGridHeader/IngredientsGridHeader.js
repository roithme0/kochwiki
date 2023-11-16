import "./IngredientsGridHeader.css"

import { useEffect, useState } from "react"

export default function IngredientsGridHeader({ verboseNames }) {
  // render header of ingredients grid

  const [headerFields, setHeaderFields] = useState([])

  useEffect(() => {
    const verboseNamesCopy = { ...verboseNames }
    delete verboseNamesCopy["id"]
    setHeaderFields(Object.entries(verboseNamesCopy))
  }, [verboseNames])

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
