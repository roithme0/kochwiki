import "./Ingredients.css"

import { getIngredients } from "../../services/api/Ingredient/Ingredient"
import { useState, useEffect } from "react"

export default function Ingredients({ setHeadline, setBack }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setHeadline("Zutaten")
    setBack({ url: "/", visibility: "" })
  }, [setHeadline, setBack])

  useEffect(() => {
    console.debug("fetching ingredients ...")
    getIngredients({ setFunction: setIngredients })
  }, [setIngredients])

  return (
    <main className="ingredients">
      {/* {ingredients.length ? (
        <IngredientsTable initialIngredients={ingredients} />
      ) : (
        <p className="placeholder">Keine Zutaten gefunden.</p>
      )} */}
    </main>
  )
}
