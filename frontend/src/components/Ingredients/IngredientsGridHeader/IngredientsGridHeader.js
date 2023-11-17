import css from "./IngredientsGridHeader.module.css"

import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"

export default function IngredientsGridHeader({
  verboseNames,
  sortKey,
  setSortKey,
  columnsToRender,
}) {
  // render header of ingredients grid

  const [headerFields, setHeaderFields] = useState({ ...verboseNames })

  useEffect(() => {
    // update header fields when columns to render change
    var newHeaderFields = {}
    columnsToRender.forEach(column => {
      newHeaderFields[column] = verboseNames[column]
    })
    console.debug("newHeaderFields: ", newHeaderFields)
    setHeaderFields(newHeaderFields)
  }, [columnsToRender])

  useEffect(() => {
    // set initial value for sort key
    setSortKey("name")
  }, [])

  return (
    <div className={css.ingredientsGridHeader}>
      {Object.keys(headerFields).map(fieldName => (
        <div
          key={fieldName}
          className={css.headerField}
          onClick={() => setSortKey(getUpdatedSortKey({ fieldName, sortKey }))}
        >
          <p className={css.columnName}>{headerFields[fieldName]}</p>
          {sortKey === fieldName ? (
            <Icon path={mdiSortDescending} size={1} className={css.sort} />
          ) : sortKey === `${fieldName}Reverse` ? (
            <Icon path={mdiSortAscending} size={1} className={css.sort} />
          ) : (
            <Icon
              path={mdiSort}
              size={1}
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
