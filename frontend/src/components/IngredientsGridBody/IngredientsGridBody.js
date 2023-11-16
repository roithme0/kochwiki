import "./IngredientsGridBody.css"

import IngredientsGridRow from "../IngredientsGridRow/IngredientsGridRow"
import { useEffect, useState } from "react"

export default function IngredientsGridBody({ initialIngredients, sortKey }) {
  // render grid body

  const [rowFields, setRowFields] = useState([])
  const [sortedIngredients, setSortedIngredients] = useState(initialIngredients)

  useEffect(() => {
    // prevent id field from beeing displayed
    const { verbose_names: verboseNames } = initialIngredients[0]
    delete verboseNames["id"]
    setRowFields(Object.keys(verboseNames))
  }, [initialIngredients])

  useEffect(() => {
    // sort ingredients
    setSortedIngredients(
      sortIngredients({ ingredients: initialIngredients, sortKey: sortKey })
    )
  }, [initialIngredients, sortKey])

  return sortedIngredients.map(ingredient => (
    <IngredientsGridRow
      ingredient={ingredient}
      fields={rowFields}
      key={ingredient.id}
    />
  ))
}

function sortIngredients({ ingredients, sortKey }) {
  // sort ingredients by sort key
  const sortField = sortKey.replace("Reverse", "")
  if (!ingredients[0].verbose_names.hasOwnProperty(sortField)) {
    console.debug("invalid sort key: ", sortKey)
    return ingredients
  }
  console.debug("sorting ingredients: ", sortKey)
  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1
    }
    if (a[sortField] > b[sortField]) {
      return 1
    }
    return 0
  })
  return sortKey.endsWith("Reverse")
    ? sortedIngredients.reverse()
    : sortedIngredients
}