import css from "./IngredientsGridHeader.module.css"

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
    // prevent id field from beeing displayed
    console.warn("getting verboseNames ...")
    const verboseNamesCopy = { ...verboseNames }
    delete verboseNamesCopy["id"]
    setHeaderFields(Object.entries(verboseNamesCopy))
  }, [verboseNames])

  useEffect(() => {
    // set initial value for sort key
    console.warn("setting initial sort key: ", headerFields[0][0])
    setSortKey(headerFields[0][0])
  }, [headerFields, setSortKey])

  return (
    <div className={css.ingredientsGridHeader}>
      {headerFields.map(([fieldName, verboseName]) => (
        <div
          key={fieldName}
          className={css.headerField}
          onClick={() => setSortKey(getUpdatedSortKey({ fieldName, sortKey }))}
        >
          <p className={css.columnName}>{verboseName}</p>
          {sortKey === fieldName ? (
            <img
              src={sortDescending}
              alt="absteigend sortiert"
              className={css.sort}
            />
          ) : sortKey === `${fieldName}Reverse` ? (
            <img
              src={sortAscending}
              alt="aufsteigend sortiert"
              className={css.sort}
            />
          ) : (
            <img
              src={sort}
              alt="sortieren"
              className={`${css.sort} ${css.sortPlaceholder}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function getUpdatedSortKey({ fieldName, sortKey }) {
  // return updated value of sort key
  if (sortKey === fieldName) {
    return `${fieldName}Reverse`
  }
  return fieldName
}
