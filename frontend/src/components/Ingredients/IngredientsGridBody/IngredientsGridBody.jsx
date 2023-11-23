import css from "./IngredientsGridBody.module.css"

import IngredientsGridRow from "../IngredientsGridRow"
import { useEffect, useState } from "react"

export default function IngredientsGridBody({
  initialIngredients, // :Array<Object> -> list of ingredients to display but unordered and unfiltered
  filter, // :String -> unit to filter ingredients by
  search, // :String -> string to search ingredients by
  sortKey, // :String -> key to sort ingredients by
  columnsToRender, // :Array<String> -> ordered columns to render
  setEditingIngredient, // :Function -> set ingredient to edit
  setDeletingIngredient, // :Function -> set ingredient to delete
}) {
  // render grid body

  const [processedIngredients, setProcessedIngredients] =
    useState(initialIngredients) // :Array<Object> -> list of ingredients to display sorted and filtered

  useEffect(() => {
    // sort, search and filter ingredients
    var ingredients = [...initialIngredients]
    ingredients = sortIngredients({
      ingredients,
      sortKey,
    })
    ingredients = filterIngredients({
      ingredients,
      filter,
    })
    ingredients = searchIngredients({
      ingredients,
      search,
    })
    setProcessedIngredients(ingredients)
  }, [initialIngredients, search, filter, sortKey])

  return (
    <div className={css.ingredientsGridBody}>
      {processedIngredients.length === 0 ? (
        <p className={css.placeholder}>Keine passenden Zutaten gefunden.</p>
      ) : null}
      {processedIngredients.map(ingredient => (
        <IngredientsGridRow
          ingredient={ingredient}
          fields={columnsToRender}
          setEditingIngredient={setEditingIngredient}
          setDeletingIngredient={setDeletingIngredient}
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

function filterIngredients({ ingredients, filter }) {
  // filter ingredients by filter string
  if (!filter) {
    console.debug("no filter string")
    return ingredients
  }
  console.debug("filtering ingredients: ", filter)
  return ingredients.filter(ingredient => {
    return ingredient.unit === filter
  })
}
