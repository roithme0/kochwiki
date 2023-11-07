import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"

import Button from "../components/ui/Button"
import IngredientsHeader from "./IngredientsHeader"

import { useState, useEffect } from "react"

export default function IngredientsTable({ unsortedIngredients }) {
  // render ingredients in a table

  const [ingredients, setIngredients] = useState(unsortedIngredients)
  const [sortKey, setSortKey] = useState({ key: "name", reverseFactor: 1 })
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    console.log("sort ingredients by: ", sortKey)
    unsortedIngredients.length && sortIngredients()
  }, [sortKey])

  useEffect(() => {
    editing &&
      document
        .getElementById("ingredient-wrapper-" + editing.id)
        .classList.add("editing")
  }, [editing])

  useEffect(() => {
    deleting &&
      document
        .getElementById("ingredient-wrapper-" + deleting.id)
        .classList.add("deleting")
  }, [deleting])

  return (
    <article className="ingredients-grid">
      <div className="header-wrapper">
        <IngredientsHeader
          ingredients={ingredients}
          sortKey={sortKey}
          updateSortKey={updateSortKey}
        />
      </div>

      <div className="ingredients-wrapper">
        {ingredients.map(ingredient => (
          <div
            key={ingredient.id}
            className="ingredient-wrapper"
            id={"ingredient-wrapper-" + ingredient.id}
          >
            <DisplayIngredient ingredient={ingredient} />
          </div>
        ))}
      </div>
    </article>
  )

  function DisplayIngredient({ ingredient }) {
    return (
      <>
        <div className="ingredient">
          <IngredientField value={ingredient.name} />
          <IngredientField value={ingredient.brand} />
          <IngredientField classNames="unit" value={ingredient.unit} />
          <IngredientField classNames="makro" value={ingredient.kcal} />
          <IngredientField classNames="makro" value={ingredient.carbs} />
          <IngredientField classNames="makro" value={ingredient.protein} />
          <IngredientField classNames="makro" value={ingredient.fat} />
        </div>
        <div className="buttons-wrapper">
          <Button
            type={"neutral"}
            img={pencil}
            clickHandler={() => setEditing(ingredient)}
            classNames="edit"
          />
          <Button
            type={"neutral"}
            img={trashBin}
            clickHandler={() => setDeleting(ingredient)}
            classNames="delete"
          />
        </div>
      </>
    )

    function IngredientField({ classNames = "", value, defaultValue = "/" }) {
      return (
        <span className={"ingredient-field " + classNames}>
          {value ? value : defaultValue}
        </span>
      )
    }
  }

  function updateSortKey({ key }) {
    var factor = 1
    if (key === sortKey.key) {
      key += "Reverse"
      factor = -1
    }
    setSortKey({ key: key, reverseFactor: factor })
  }

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
}
