import css from "./IngredientsGrid.module.css"

import IngredientsGridHeader from "../IngredientsGridHeader"
import IngredientsGridBody from "../IngredientsGridBody"
import Search from "../../ui/Search/Search"
import IngredientsFilter from "../../ui/IngredientsFilter"
import { useEffect, useState, useRef } from "react"

const columnsOrder = [
  // order of columns to render
  "name",
  "brand",
  "kcal",
  "carbs",
  "protein",
  "fat",
  "unit",
  "edit",
  "delete",
]

export default function IngredientsGrid({
  ingredients, // :Array<Object> -> list of ingredients to display
  setEditingIngredient, // :Function -> set ingredient to edit
  setDeletingIngredient, // :Function -> set ingredient to delete
}) {
  // render header and body for a grid of ingredients

  const ingredientsGrid = useRef()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [columnsToRender, setColumnsToRender] = useState([
    "name",
    "brand",
    "edit",
    "delete",
  ])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [sortKey, setSortKey] = useState("")

  useEffect(() => {
    // track window width
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    console.debug("windowWidth: ", windowWidth)
    return () => window.removeEventListener("resize", handleResize)
  })

  useEffect(() => {
    // update columns to render when window width changes
    var columns = getColumnsToRender({ windowWidth })
    columns = sortColumnsToRender({
      columnsToRender: columns,
      columnsOrder,
    })
    setColumnsToRender(columns)
  }, [windowWidth])

  useEffect(() => {
    // update css variable --columns to adjust grid to displayed columns
    ingredientsGrid.current.style.setProperty(
      "--columns",
      columnsToRender.length
    )
  }, [columnsToRender])

  return (
    <div className={css.ingredientsGrid} ref={ingredientsGrid}>
      <div className={css.gridControls}>
        <Search setSearch={setSearch} />
        <IngredientsFilter setFilter={setFilter} />
      </div>
      <IngredientsGridHeader
        verboseNames={ingredients[0].verbose_names}
        sortKey={sortKey}
        setSortKey={setSortKey}
        columnsToRender={columnsToRender}
      />
      <IngredientsGridBody
        initialIngredients={ingredients}
        search={search}
        filter={filter}
        sortKey={sortKey}
        columnsToRender={columnsToRender}
        setEditingIngredient={setEditingIngredient}
        setDeletingIngredient={setDeletingIngredient}
      />
    </div>
  )
}

function getColumnsToRender({ windowWidth }) {
  // return the columns to render based on window width
  var columns = ["name", "brand", "edit", "delete"]
  windowWidth > 600 && columns.push("kcal")
  windowWidth > 700 && columns.push("unit")
  windowWidth > 1200 && columns.push("carbs", "protein", "fat")
  console.debug("columnsToRender: ", columns)
  return columns
}

function sortColumnsToRender({ columnsToRender, columnsOrder }) {
  // sort columns to render based on columns order
  var sortedColumns = []
  columnsOrder.forEach(column => {
    if (columnsToRender.includes(column)) {
      sortedColumns.push(column)
    }
  })
  console.debug("sortedColumns: ", sortedColumns)
  return sortedColumns
}
