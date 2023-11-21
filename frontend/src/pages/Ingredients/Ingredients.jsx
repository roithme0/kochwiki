import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import getIngredients from "../../services/api/Ingredient/getIngredients"
import getIngredient from "../../services/api/Ingredient/getIngredient"
import IngredientsGrid from "../../components/Ingredients/IngredientsGrid"
import Popup from "../../components/popups/Popup"
import IngredientAddPopup from "../../components/popups/IngredientAddPopup"
import IngredientEditPopup from "../../components/popups/IngredientEditPopup"

export default function Ingredients({ setHeadline, setBack, setButtons }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])
  const [ingredientAddPopup, setIngredientAddPopup] = useState(false)
  const [editedIngredient, setEditedIngredient] = useState(null)

  useEffect(() => {
    // configure header and footer
    setHeadline("Zutaten")
    setBack({ url: "/", visibility: "" })
    setButtons([
      {
        icon: mdiPlus,
        clickHandler: () => {
          setIngredientAddPopup(true)
        },
      },
    ])
  }, [])

  useEffect(() => {
    console.debug("fetching ingredients ...")
    getIngredients({ setFunction: setIngredients })
  }, [])

  return (
    <>
      <main className={css.ingredients}>
        {ingredients.length ? (
          <IngredientsGrid
            ingredients={ingredients}
            setEditedIngredient={setEditedIngredient}
          />
        ) : (
          <p className={css.placeholder}>Keine Zutaten gefunden.</p>
        )}
      </main>
      {ingredientAddPopup && (
        <Popup
          Component={IngredientAddPopup}
          closeHandler={({ changedIngredient }) => {
            changedIngredient &&
              updateIngredient({
                changedIngredient,
                ingredients,
                setIngredients,
              })
            setIngredientAddPopup(false)
          }}
        />
      )}
      {editedIngredient && (
        <Popup
          Component={IngredientEditPopup}
          closeHandler={({ changedIngredient }) => {
            console.log("changedIngredient: ", changedIngredient)
            changedIngredient &&
              updateIngredient({
                changedIngredient,
                ingredients,
                setIngredients,
              })
            setEditedIngredient(null)
          }}
          ingredient={editedIngredient}
        />
      )}
    </>
  )
}

async function updateIngredient({
  changedIngredient,
  ingredients,
  setIngredients,
}) {
  // update ingredient in ingredients array or add it if it doesn't exist yet
  if (changedIngredient === null) {
    console.debug("no changes were made")
    return
  }

  const result = await getIngredient({ id: changedIngredient.id })
  if (result.success === false) {
    console.error("could not update or add ingredient: ", changedIngredient.id)
    return
  }

  console.debug("updating or adding ingredient: ", changedIngredient.id)
  var updatedIngredients = ingredients.filter(
    ingredient => ingredient.id !== changedIngredient.id
  )
  updatedIngredients.push(result.fetchedIngredient)
  setIngredients(updatedIngredients)
}
