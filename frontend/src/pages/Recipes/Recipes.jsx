import css from "./Recipes.module.css"

import { mdiPlus } from "@mdi/js"
import RecipesGrid from "../../components/Recipes/RecipesGrid"
import getRecipes from "../../services/api/Recipe/getRecipes"
import Popup from "../../components/popups/Popup"
import LoadingPopup from "../../components/popups/LoadingPopup"
import { useState, useEffect } from "react"

export default function Recipes({ setHeadline, setBack, setButtons }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // configure page header
    setHeadline("Rezepte")
    setBack({ url: "/", visibility: "" })
    setButtons([
      {
        icon: mdiPlus,
        clickHandler: () => {},
      },
    ])
  }, [])

  useEffect(() => {
    // fetch recipes
    getRecipes({
      setFunction: setRecipes,
      callback: () => setLoading(false),
      errorCallback: () => {
        setError(true)
        setLoading(false)
      },
    })
  }, [])

  return (
    <>
      <main>
        {!loading &&
          (recipes.length === 0 ? (
            <p className={css.placeholder}>Keine Rezepte gefunden.</p>
          ) : (
            <RecipesGrid recipes={recipes} />
          ))}
      </main>
      {loading && (
        <Popup
          Component={LoadingPopup}
          text="Lade Rezepte ..."
          closeHandler={() => setLoading(false)}
        />
      )}
    </>
  )
}
