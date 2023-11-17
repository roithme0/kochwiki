import css from "./Ingredients.module.css"

import { mdiPlus } from "@mdi/js"
import { useState, useEffect } from "react"
import { getIngredients } from "../../services/api/Ingredient/Ingredient"
import IngredientsGrid from "../../components/IngredientsGrid/IngredientsGrid"

export default function Ingredients({ setHeadline, setBack, setButtons }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setHeadline("Zutaten")
    setBack({ url: "/", visibility: "" })
    setButtons([
      {
        icon: mdiPlus,
        clickHandler: () => {},
      },
    ])
  }, [])

  useEffect(() => {
    console.debug("fetching ingredients ...")
    getIngredients({ setFunction: setIngredients })
  }, [])

  return (
    <main className={css.ingredients}>
      {ingredients.length ? (
        <IngredientsGrid ingredients={ingredients} />
      ) : (
        <p className={css.placeholder}>Keine Zutaten gefunden.</p>
      )}
    </main>
  )
}
