import "./Ingredients.css"

import IngredientsTable from "../../components/IngredientsTable/IngredientsTable"

import { getIngredients } from "../../services/api/Ingredient/Ingredient"

import { useState, useEffect } from "react"

export default function Ingredients({ setHeadline, setBack }) {
  // fetch and render ingredients

  useEffect(() => {
    setHeadline("Zutaten")
    setBack({ url: "/", visibility: "" })
  }, [])

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    console.debug("fetching ingredients ...")
    getIngredients({ setFunction: setIngredients })
  }, [])

  return (
    <main className="ingredients">
      {ingredients.length ? (
        <IngredientsTable initialIngredients={ingredients} />
      ) : (
        <p>Keine Zutaten gefunden.</p>
      )}
    </main>
  )
}
