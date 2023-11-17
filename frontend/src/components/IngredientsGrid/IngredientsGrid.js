import css from "./IngredientsGrid.module.css"

import IngredientsGridHeader from "../IngredientsGridHeader/IngredientsGridHeader"
import IngredientsGridBody from "../IngredientsGridBody/IngredientsGridBody"
import Search from "../../components/ui/Search/Search"
import IngredientsFilter from "../../components/ui/IngredientsFilter/IngredientsFilter"
import { useEffect, useState } from "react"

export default function IngredientsGrid({ ingredients }) {
  // render header and grid of ingredients

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [sortKey, setSortKey] = useState("")

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    console.debug("windowWidth: ", windowWidth)
    return () => window.removeEventListener("resize", handleResize)
  })

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

function getColumnsToRender(windowWidth) {
  // return the columns to render based on window width
  var columns = ["name", "brand", "edit", "delete"]
  windowWidth > 600 && columns.push("kcal")
  windowWidth > 700 && columns.push("unit")
  windowWidth > 1200 && columns.push("carbs", "protein", "fat")
  return columns
}
