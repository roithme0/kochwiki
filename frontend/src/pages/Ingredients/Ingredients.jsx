import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import getIngredients from "../../services/api/Ingredient/getIngredients"
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
          closeHandler={() => setIngredientAddPopup(false)}
        />
      )}
      {editedIngredient && (
        <Popup
          Component={IngredientEditPopup}
          closeHandler={() => setEditedIngredient(null)}
          ingredient={editedIngredient}
        />
      )}
    </>
  )
}
