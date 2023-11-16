import "./Ingredients.css"

import { useState, useEffect } from "react"
import { getIngredients } from "../../services/api/Ingredient/Ingredient"
import IngredientsGrid from "../../components/IngredientsGrid/IngredientsGrid"

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
      {ingredients.length ? (
        <div className="ingredients">
          <IngredientsGrid ingredients={ingredients} />
        </div>
      ) : (
        <p className="placeholder">Keine Zutaten gefunden.</p>
      )}
    </main>
  )
}
