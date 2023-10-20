import "./DisplayIngredient.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"
import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"

import Button from "./ui/Button.js"

export default function DisplayIngredient({
  ingredient = null,
  editIngredient = null,
  deleteIngredient = null,
  onClick = null,
  sortKey = null,
}) {
  if (ingredient) {
    return (
      <>
        <div className="ingredient">
          <span className="display-field">{ingredient.name}</span>
          <span className="display-field">
            {ingredient.brand ? ingredient.brand : "/"}
          </span>
          <span className="display-field makro">
            {ingredient.kcal ? ingredient.kcal : "/"}
          </span>
          <span className="display-field makro">
            {ingredient.carbs ? ingredient.carbs : "/"}
          </span>
          <span className="display-field makro">
            {ingredient.protein ? ingredient.protein : "/"}
          </span>
          <span className="display-field makro">
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
  return (
    <>
      <div className="header">
        <div className="header-field-wrapper">
          <span onClick={() => onClick("name")} className="header-field">
            Name
          </span>
          {sortKey === "name" ? (
            <img src={sortAscending}></img>
          ) : sortKey === "nameReverse" ? (
            <img src={sortDescending}></img>
          ) : null}
        </div>
        <div className="header-field-wrapper">
          <span onClick={() => onClick("brand")} className="header-field">
            Marke
          </span>
        </div>
        <div className="header-field-wrapper">
          <span onClick={() => onClick("kcal")} className="header-field makro">
            Kalorien
          </span>
        </div>
        <div className="header-field-wrapper">
          <span onClick={() => onClick("carbs")} className="header-field makro">
            Kohlenhydrate
          </span>
        </div>
        <div className="header-field-wrapper">
          <span
            onClick={() => onClick("protein")}
            className="header-field makro"
          >
            Protein
          </span>
        </div>
        <div className="header-field-wrapper">
          <span onClick={() => onClick("fat")} className="header-field makro">
            Fett
          </span>
        </div>
      </div>
      <div className="buttons-wrapper">
        <div></div>
        <div></div>
      </div>
    </>
  )
}
