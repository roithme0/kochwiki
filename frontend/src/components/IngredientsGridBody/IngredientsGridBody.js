import "./IngredientsGridBody.css"

import IngredientsGridRow from "../IngredientsGridRow/IngredientsGridRow"
import { useEffect, useState } from "react"

export default function IngredientsGridBody({
  initialIngredients,
  sortKey,
  search,
}) {
  // render grid body

  const [rowFields, setRowFields] = useState([])
  const [processedIngredients, setProcessedIngredients] =
    useState(initialIngredients)

  useEffect(() => {
    // prevent id field from beeing displayed
    const { verbose_names: verboseNames } = initialIngredients[0]
    delete verboseNames["id"]
    setRowFields(Object.keys(verboseNames))
  }, [initialIngredients])

  useEffect(() => {
    // sort and search ingredients
    var ingredients = [...initialIngredients]
    ingredients = sortIngredients({
      ingredients: ingredients,
      sortKey: sortKey,
    })
    ingredients = searchIngredients({
      ingredients: ingredients,
      search: search,
    })
    setProcessedIngredients(ingredients)
  }, [initialIngredients, sortKey, search])

  return (
    <div className="ingredients-grid-body">
      {processedIngredients.length === 0 ? (
        <p className="placeholder">Keine passenden Zutaten gefunden.</p>
      ) : null}
      {processedIngredients.map(ingredient => (
        <IngredientsGridRow
          ingredient={ingredient}
          fields={rowFields}
          key={ingredient.id}
        />
      ))}
    </div>
  )
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

function searchIngredients({ ingredients, search }) {
  // search ingredients by search string
  if (!search) {
    console.debug("no search string")
    return ingredients
  }
  console.debug("searching ingredients: ", search)
  return ingredients.filter(ingredient => {
    return (
      ingredient.name.toLowerCase().includes(search.toLowerCase()) ||
      ingredient.brand.toLowerCase().includes(search.toLowerCase())
    )
  })
}
