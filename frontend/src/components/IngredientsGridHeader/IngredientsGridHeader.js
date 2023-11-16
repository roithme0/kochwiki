import "./IngredientsGridHeader.css"

import sort from "../../assets/images/mdi/sort.png"
import sortDescending from "../../assets/images/mdi/sort-descending.png"
import sortAscending from "../../assets/images/mdi/sort-ascending.png"
import { useEffect, useState } from "react"

export default function IngredientsGridHeader({
  verboseNames,
  sortKey,
  setSortKey,
}) {
  // render header of ingredients grid

  const [headerFields, setHeaderFields] = useState(Object.entries(verboseNames))

  useEffect(() => {
    const verboseNamesCopy = { ...verboseNames }
    delete verboseNamesCopy["id"]
    setHeaderFields(Object.entries(verboseNamesCopy))
  }, [verboseNames])

  useEffect(() => {
    setSortKey(headerFields[0][0])
  }, [headerFields, setSortKey])

  return (
    <div className="ingredients-grid-header">
      {headerFields.map(([fieldName, verboseName]) => (
        <div className="header-field">
          <p key={fieldName} className="column-name">
            {verboseName}
          </p>
          {sortKey === fieldName ? (
            <img
              src={sortDescending}
              alt="absteigend sortiert"
              className="sort sort-descending"
            />
          ) : (
            <img src={sort} alt="sortieren" className="sort sort-placeholder" />
          )}
        </div>
      ))}
    </div>
  )
}
