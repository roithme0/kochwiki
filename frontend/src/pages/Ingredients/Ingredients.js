import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import { getIngredients } from "../../services/api/Ingredient/Ingredient"
import IngredientsGrid from "../../components/Ingredients/IngredientsGrid/IngredientsGrid"
import Popup from "../../components/popups/Popup/Popup"
import IngredientAddPopup from "../../components/popups/IngredientAddPopup/IngredientAddPopup"

export default function Ingredients({ setHeadline, setBack, setButtons }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])
  const [ingredientAddPopup, setIngredientAddPopup] = useState(false)

  useEffect(() => {
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
          <IngredientsGrid ingredients={ingredients} />
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
    </>
  )
}
