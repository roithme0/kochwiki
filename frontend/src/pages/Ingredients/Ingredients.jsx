import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import getIngredients from "../../services/api/Ingredient/getIngredients"
import getIngredient from "../../services/api/Ingredient/getIngredient"
import IngredientsGrid from "../../components/Ingredients/IngredientsGrid"
import Popup from "../../components/popups/Popup"
import IngredientAddPopup from "../../components/popups/IngredientAddPopup"
import IngredientEditPopup from "../../components/popups/IngredientEditPopup"
import IngredientDeletePopup from "../../components/popups/IngredientDeletePopup"

export default function Ingredients({ setHeadline, setBack, setButtons }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])
  const [ingredientAddPopup, setIngredientAddPopup] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)
  const [deletingIngredient, setDeletingIngredient] = useState(null)

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
            setEditingIngredient={setEditingIngredient}
            setDeletingIngredient={setDeletingIngredient}
          />
        ) : (
          <p className={css.placeholder}>Keine Zutaten gefunden.</p>
        )}
      </main>
      {ingredientAddPopup && (
        <Popup
          Component={IngredientAddPopup}
          closeHandler={({ createdIngredient }) => {
            createdIngredient &&
              addIngredient({
                createdIngredient,
                setIngredients,
              })
            setIngredientAddPopup(false)
          }}
        />
      )}
      {editingIngredient && (
        <Popup
          Component={IngredientEditPopup}
          closeHandler={({ updatedIngredient }) => {
            console.log("updatedIngredient: ", updatedIngredient)
            updatedIngredient &&
              updateIngredient({
                updatedIngredient,
                setIngredients,
              })
            setEditingIngredient(null)
          }}
          ingredient={editingIngredient}
        />
      )}
      {deletingIngredient && (
        <Popup
          Component={IngredientDeletePopup}
          closeHandler={() => setDeletingIngredient(null)}
          ingredient={deletingIngredient}
        />
      )}
    </>
  )
}

function addIngredient({ createdIngredient, setIngredients }) {
  // add created ingredient to grid
  if (createdIngredient === null) {
    console.debug("no ingredient was created")
    return
  }

  getIngredient({
    id: createdIngredient.id,
    callback: ({ fetchedIngredient }) =>
      setIngredients(ingredients => [...ingredients, fetchedIngredient]),
  })
}

function updateIngredient({ updatedIngredient, setIngredients }) {
  // update changed ingredient in grid
  if (updatedIngredient === null) {
    console.debug("no changes were made to ingredient")
    return
  }

  getIngredient({
    id: updatedIngredient.id,
    callback: ({ fetchedIngredient }) =>
      setIngredients(ingredients =>
        ingredients.map(ingredient =>
          ingredient.id === fetchedIngredient.id
            ? fetchedIngredient
            : ingredient
        )
      ),
  })
}
