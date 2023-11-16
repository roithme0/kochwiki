import "./Ingredients.css"

import { useState, useEffect } from "react"
import { getIngredients } from "../../services/api/Ingredient/Ingredient"
import Search from "../../components/ui/Search/Search"
import IngredientsGrid from "../../components/IngredientsGrid/IngredientsGrid"

export default function Ingredients({ setHeadline, setBack }) {
  // fetch and render ingredients

  const [ingredients, setIngredients] = useState([])
  const [search, setSearch] = useState("")

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
          <Search setSearch={setSearch} />
          <IngredientsGrid ingredients={ingredients} search={search} />
        </div>
      ) : (
        <p className="placeholder">Keine Zutaten gefunden.</p>
      )}
    </main>
  )
}
