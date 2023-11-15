import IngredientsTableHeader from "../IngredientsTableHeader/IngredientsTableHeader"
import IngredientsTableRows from "../IngredientsTableRows/IngredientsTableRows"

import { useState } from "react"

export default function IngredientsTable({ initialIngredients }) {
  // render ingredients in a table

  const [sortKey, setSortKey] = useState({ key: "name", reverseFactor: 1 })

  return (
    <article className="ingredients-grid">
      <IngredientsTableHeader
        ingredients={initialIngredients}
        sortKey={sortKey}
        updateSortKey={updateSortKey}
      />

      <IngredientsTableRows
        ingredients={initialIngredients}
        sortKey={sortKey}
      />
    </article>
  )

  function updateSortKey({ key }) {
    var factor = 1
    if (key === sortKey.key) {
      key += "Reverse"
      factor = -1
    }
    setSortKey({ key: key, reverseFactor: factor })
  }
}
