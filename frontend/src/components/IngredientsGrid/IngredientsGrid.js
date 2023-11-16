import css from "./IngredientsGrid.module.css"

import IngredientsGridHeader from "../IngredientsGridHeader/IngredientsGridHeader"
import IngredientsGridBody from "../IngredientsGridBody/IngredientsGridBody"
import Search from "../../components/ui/Search/Search"
import IngredientsFilter from "../../components/ui/IngredientsFilter/IngredientsFilter"
import { useState } from "react"

export default function IngredientsGrid({ ingredients }) {
  // render header and grid of ingredients

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [sortKey, setSortKey] = useState("")

  return (
    <div className={css.ingredientsGrid}>
      <div className={css.gridControls}>
        <Search setSearch={setSearch} />
        <IngredientsFilter setFilter={setFilter} />
      </div>
      <IngredientsGridHeader
        verboseNames={ingredients[0].verbose_names}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
      <IngredientsGridBody
        initialIngredients={ingredients}
        search={search}
        filter={filter}
        sortKey={sortKey}
      />
    </div>
  )
}
