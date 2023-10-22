import "./DisplayIngredient.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"
import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"
import sort from "../assets/images/mdi/sort.png"

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
      <Ingredient
        ingredient={ingredient}
        editIngredient={editIngredient}
        deleteIngredient={deleteIngredient}
      />
    )
  } else {
    return <Header onClick={onClick} sortKey={sortKey} />
  }

  function Ingredient({ ingredient, editIngredient, deleteIngredient }) {
    return (
      <>
        <div className="ingredient">
          <IngredientField value={ingredient.name} defaultValue={"/"} />
          <IngredientField value={ingredient.brand} defaultValue={"/"} />
          <IngredientField
            classNames={"makro"}
            value={ingredient.kcal}
            defaultValue={"/"}
          />
          <IngredientField
            classNames={"makro"}
            value={ingredient.carbs}
            defaultValue={"/"}
          />
          <IngredientField
            classNames={"makro"}
            value={ingredient.protein}
            defaultValue={"/"}
          />
          <IngredientField
            classNames={"makro"}
            value={ingredient.fat}
            defaultValue={"/"}
          />
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

  function IngredientField({ classNames = "", value, defaultValue }) {
    return (
      <span className={"ingredient-field " + classNames}>
        {value ? value : defaultValue}
      </span>
    )
  }

  function Header({ onClick, sortKey }) {
    return (
      <>
        <div className="header">
          <HeaderField
            fieldName="name"
            value="Name"
            onClick={onClick}
            sortKey={sortKey}
          />
          <HeaderField
            fieldName="brand"
            value="Marke"
            onClick={onClick}
            sortKey={sortKey}
          />
          <HeaderField
            classNames={"makro"}
            fieldName="kcal"
            value="Kalorien"
            onClick={onClick}
            sortKey={sortKey}
          />
          <HeaderField
            classNames={"makro"}
            fieldName="carbs"
            value="Kohlenhydrate"
            onClick={onClick}
            sortKey={sortKey}
          />
          <HeaderField
            classNames={"makro"}
            fieldName="protein"
            value="Protein"
            onClick={onClick}
            sortKey={sortKey}
          />
          <HeaderField
            classNames={"makro"}
            fieldName="fat"
            value="Fett"
            onClick={onClick}
            sortKey={sortKey}
          />
        </div>
        <div className="buttons-wrapper">
          <div></div>
          <div></div>
        </div>
      </>
    )
  }

  function HeaderField({
    classNames = "",
    fieldName,
    value,
    onClick,
    sortKey,
  }) {
    return (
      <div
        onClick={() => onClick(fieldName)}
        className={"header-field-wrapper " + classNames}
      >
        <span className="header-field">{value}</span>
        {sortKey === fieldName ? (
          <img src={sortAscending}></img>
        ) : sortKey === fieldName + "Reverse" ? (
          <img src={sortDescending}></img>
        ) : (
          <img src={sort} className="hidden"></img>
        )}
      </div>
    )
  }
}
