import "./IngredientsGrid.css"

import IngredientsGridHeader from "../IngredientsGridHeader/IngredientsGridHeader"
import IngredientsGridBody from "../IngredientsGridBody/IngredientsGridBody"
import { useState } from "react"

export default function IngredientsGrid({ ingredients }) {
  // render header and grid of ingredients

  const [sortKey, setSortKey] = useState("")

  return (
    <div className="ingredients-grid">
      <IngredientsGridHeader
        verboseNames={ingredients[0].verbose_names}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
      <IngredientsGridBody initialIngredients={ingredients} sortKey={sortKey} />
    </div>
  )
}
