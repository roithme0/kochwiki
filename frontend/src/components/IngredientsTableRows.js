import IngredientsTableRow from "./IngredientsTableRow"

import { getIngredient } from "../services/api/Ingredient"

import { useState, useEffect } from "react"

export default function IngredientsTableRows({ initialIngredients, sortKey }) {
  // render ingredients as rows in a table

  const [unsortedIngredients, setUnsortedIngredients] = useState([])
  const [ingredients, setIngredients] = useState([])
  // const [editing, setEditing] = useState(null)
  // const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    setUnsortedIngredients(initialIngredients)
    // setIngredients(unsortedIngredients)
  }, [])

  useEffect(() => {
    console.debug("sorting ingredients by: ", sortKey)
    unsortedIngredients.length && sortIngredients()
    console.debug("sorted ingredients: ", ingredients)
  }, [sortKey])

  // useEffect(() => {
  //   editing &&
  //     document
  //       .getElementById("ingredient-wrapper-" + editing.id)
  //       .classList.add("editing")
  // }, [editing])

  // useEffect(() => {
  //   deleting &&
  //     document
  //       .getElementById("ingredient-wrapper-" + deleting.id)
  //       .classList.add("deleting")
  // }, [deleting])

  return (
    <div className="ingredients-wrapper">
      {ingredients.map(ingredient => (
        <div
          key={ingredient.id}
          className="ingredient-wrapper"
          id={"ingredient-wrapper-" + ingredient.id}
        >
          <IngredientsTableRow
            ingredient={ingredient}
            updateIngredient={updateIngredient}
          />
        </div>
      ))}
    </div>
  )

  function sortIngredients() {
    const key = sortKey.key.replace("Reverse", "")
    let res = 0
    setIngredients(
      [...unsortedIngredients].sort((a, b) => {
        if (a[key] < b[key]) {
          res = -1
        } else if (a[key] > b[key]) {
          res = 1
        } else {
          res = 0
        }
        return res * sortKey.reverseFactor
      })
    )
  }

  async function updateIngredient({ updatedIngredient }) {
    document
      .getElementById("ingredient-wrapper-" + updatedIngredient.id)
      .classList.remove("editing")

    const response = await getIngredient({ id: updatedIngredient.id })
    response.success &&
      setUnsortedIngredients(
        unsortedIngredients.map(ingredient => {
          if (ingredient.id === response.fetchedIngredient.id) {
            return response.fetchedIngredient
          } else {
            return ingredient
          }
        })
      )
  }
}
