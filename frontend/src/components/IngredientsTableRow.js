import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"

import Button from "../components/ui/Button"
import Popup from "../components/Popup"
import EditIngredientPopup from "../components/popups/EditIngredientPopup"
import DeleteIngredientPopup from "../components/popups/DeleteIngredientPopup"

import { useState, useEffect } from "react"

export default function DisplayIngredient({ ingredient, updateIngredient }) {
  // render ingredient in a table row

  //   const [editing, setEditing] = useState(null)
  //   const [deleting, setDeleting] = useState(null)

  //   useEffect(() => {
  //     editing &&
  //       document
  //         .getElementById("ingredient-wrapper-" + editing.id)
  //         .classList.add("editing")
  //   }, [editing])

  //   useEffect(() => {
  //     deleting &&
  //       document
  //         .getElementById("ingredient-wrapper-" + deleting.id)
  //         .classList.add("deleting")
  //   }, [deleting])

  return (
    <>
      <div className="ingredient">
        <IngredientField value={ingredient.name} />
        <IngredientField value={ingredient.brand} />
        <IngredientField classNames="unit" value={ingredient.unit} />
        <IngredientField classNames="makro" value={ingredient.kcal} />
        <IngredientField classNames="makro" value={ingredient.carbs} />
        <IngredientField classNames="makro" value={ingredient.protein} />
        <IngredientField classNames="makro" value={ingredient.fat} />
      </div>
      <div className="buttons-wrapper">
        <Button
          type={"neutral"}
          img={pencil}
          //   clickHandler={() => setEditing(ingredient)}
          classNames="edit"
        />
        <Button
          type={"neutral"}
          img={trashBin}
          //   clickHandler={() => setDeleting(ingredient)}
          classNames="delete"
        />
      </div>
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

  function IngredientField({ classNames = "", value, defaultValue = "/" }) {
    return (
      <span className={"ingredient-field " + classNames}>
        {value ? value : defaultValue}
      </span>
    )
  }

  //   async function closeDeletePopup({ id = null, errorResponse = null }) {
  //     if (id) {
  //       // deleting was successfull
  //       setIngredients(ingredients.filter(i => i.id !== id))
  //     } else {
  //       // deleting failed
  //       document
  //         .getElementById("ingredient-wrapper-" + deleting.id)
  //         .classList.remove("deleting")
  //     }
  //     setDeleting(null)
  //   }
}
