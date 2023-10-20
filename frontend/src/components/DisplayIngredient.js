import "./DisplayIngredient.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"

import Button from "./ui/Button.js"

export default function DisplayIngredient({
  ingredient = null,
  editIngredient = null,
  deleteIngredient = null,
}) {
  if (ingredient === null) {
    return (
      <>
        <div className="header">
          <span className="header-field">Name</span>
          <span className="header-field">Marke</span>
          <span className="header-field">kcal</span>
          <span className="header-field">Kohlenhydrate</span>
          <span className="header-field">Protein</span>
          <span className="header-field">Fett</span>
        </div>
        <div className="buttons-wrapper">
          <div></div>
          <div></div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="ingredient">
        <span className="display-field">{ingredient.name}</span>
        <span className="display-field">
          {ingredient.brand ? ingredient.brand : "/"}
        </span>
        <span className="display-field">
          {ingredient.kcal ? ingredient.kcal : "/"}
        </span>
        <span className="display-field">
          {ingredient.carbs ? ingredient.carbs : "/"}
        </span>
        <span className="display-field">
          {ingredient.protein ? ingredient.protein : "/"}
        </span>
        <span className="display-field">
          {ingredient.fat ? ingredient.fat : "/"}
        </span>
      </div>
      <div className="buttons-wrapper">
        <Button
          type={"neutral"}
          img={pencil}
          onClick={() => editIngredient(ingredient)}
          classNames="edit"
        />
        <Button
          type={"neutral"}
          img={trashBin}
          onClick={() => deleteIngredient(ingredient.id)}
          classNames="delete"
        />
      </div>
    </>
  )
}
