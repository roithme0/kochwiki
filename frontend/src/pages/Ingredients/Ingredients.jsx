import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import getIngredients from "../../services/api/Ingredient/getIngredients"
import getIngredient from "../../services/api/Ingredient/getIngredient"
import IngredientsGrid from "../../components/Ingredients/IngredientsGrid"
import Popup from "../../components/popups/Popup"
import LoadingPopup from "../../components/popups/LoadingPopup"
import IngredientAddPopup from "../../components/popups/IngredientAddPopup"
import IngredientEditPopup from "../../components/popups/IngredientEditPopup"
import IngredientDeletePopup from "../../components/popups/IngredientDeletePopup"

export default function Ingredients({ setHeadline, setBack, setButtons }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])
  const [ingredientAddPopup, setIngredientAddPopup] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)
  const [deletingIngredient, setDeletingIngredient] = useState(null)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    getIngredients({
      setFunction: setIngredients,
      callback: () => setLoading(false),
      errorCallback: () => {},
    })
  }, [])

  return (
    <>
      <main className={css.ingredients}>
        {!loading &&
          (ingredients.length === 0 ? (
            <p className={css.placeholder}>Keine Zutaten gefunden.</p>
          ) : (
            <IngredientsGrid
              ingredients={ingredients}
              setEditingIngredient={setEditingIngredient}
              setDeletingIngredient={setDeletingIngredient}
            />
          ))}
      </main>
      {loading && (
        <Popup
          Component={LoadingPopup}
          text="Lade Zutaten ..."
          closeHandler={() => setLoading(false)}
        />
      )}
      {ingredientAddPopup && (
        <Popup
          Component={IngredientAddPopup}
          closeHandler={({ createdIngredient }) => {
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
          closeHandler={({ deletedIngredientID }) => {
            removeIngredient({ deletedIngredientID, setIngredients })
            setDeletingIngredient(null)
          }}
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

function removeIngredient({ deletedIngredientID, setIngredients }) {
  // remove deleted ingredient from grid
  if (deletedIngredientID === null) {
    console.debug("no ingredient was deleted")
    return
  }
  setIngredients(ingredients =>
    ingredients.filter(ingredient => ingredient.id !== deletedIngredientID)
  )
}
