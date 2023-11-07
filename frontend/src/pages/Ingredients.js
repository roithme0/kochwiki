import "./Ingredients.css"

import Popup from "../components/Popup"
import EditIngredientPopup from "../components/popups/EditIngredientPopup"
import DeleteIngredientPopup from "../components/popups/DeleteIngredientPopup"
import IngredientsTable from "../components/IngredientsTable"

import { getIngredient, getIngredients } from "../services/api/Ingredient"

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
    <>
      <main className="ingredients">
        {ingredients.length ? (
          <IngredientsTable unsortedIngredients={ingredients} />
        ) : (
          <p>Keine Zutaten gefunden.</p>
        )}
      </main>
      {/* {editing && (
        <Popup
          Component={EditIngredientPopup}
          title={"Zutat bearbeiten"}
          ingredient={editing}
          submitCallback={updateIngredient}
          closeHandler={() => setEditing(null)}
        ></Popup>
      )}
      {deleting && (
        <Popup
          Component={DeleteIngredientPopup}
          title={`${deleting.name} von ${deleting.brand} löschen?`}
          ingredient={deleting}
          closeHandler={closeDeletePopup}
          closeHandlerProps={{ id: deleting.id }}
        ></Popup>
      )} */}
    </>
  )

  // async function updateIngredient({ updatedIngredient }) {
  //   document
  //     .getElementById("ingredient-wrapper-" + updatedIngredient.id)
  //     .classList.remove("editing")

  //   const response = await getIngredient({ id: updatedIngredient.id })
  //   response.success &&
  //     setUnsortedIngredients(
  //       unsortedIngredients.map(ingredient => {
  //         if (ingredient.id === response.fetchedIngredient.id) {
  //           return response.fetchedIngredient
  //         } else {
  //           return ingredient
  //         }
  //       })
  //     )
  // }

  // async function closeDeletePopup({ id = null, errorResponse = null }) {
  //   if (id) {
  //     // deleting was successfull
  //     setIngredients(ingredients.filter(i => i.id !== id))
  //   } else {
  //     // deleting failed
  //     document
  //       .getElementById("ingredient-wrapper-" + deleting.id)
  //       .classList.remove("deleting")
  //   }
  //   setDeleting(null)
  // }
}
