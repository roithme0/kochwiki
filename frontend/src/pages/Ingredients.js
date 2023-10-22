import "./Ingredients.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"
import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"
import sort from "../assets/images/mdi/sort.png"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"
import Popup from "../components/Popup.js"
import EditIngredient from "../components/EditIngredient"
import Button from "../components/ui/Button.js"
import FetchIngredients from "../hooks/FetchIngredients.js"

import { useState, useEffect } from "react"

export default function Ingredients() {
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }
  const [ingredients, setIngredients] = useState([])
  const [editing, setEditing] = useState(null)
  const [sortKey, setSortKey] = useState("name")

  useEffect(() => {
    FetchIngredients(setIngredients)
  }, [])

  return (
    <>
      <Header headline={headline} back={back} />
      <main className="ingredients">
        <article className="ingredients-grid">
          <div className="header-wrapper">
            <DisplayIngredient onClick={sortIngredients} sortKey={sortKey} />
          </div>
          <div className="ingredients-wrapper">
            {ingredients.map(ingredient => (
              <div key={ingredient.id} className="ingredient-wrapper">
                <DisplayIngredient
                  ingredient={ingredient}
                  editIngredient={editIngredient}
                  deleteIngredient={deleteIngredient}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      {editing && (
        <Popup
          closePopup={closePopup}
          Component={EditIngredient}
          title={"Zutat bearbeiten"}
          submitEdit={submitEdit}
          cancelEdit={cancelEdit}
          ingredient={editing}
        ></Popup>
      )}
    </>
  )

  function DisplayIngredient({
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
      return <IngredientHeader onClick={onClick} sortKey={sortKey} />
    }
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

  function IngredientHeader({ onClick, sortKey }) {
    return (
      <>
        <div className="header">
          <IngredientHeaderField
            fieldName="name"
            value="Name"
            onClick={onClick}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            fieldName="brand"
            value="Marke"
            onClick={onClick}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="kcal"
            value="Kalorien"
            onClick={onClick}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="carbs"
            value="Kohlenhydrate"
            onClick={onClick}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="protein"
            value="Protein"
            onClick={onClick}
            sortKey={sortKey}
          />
          <IngredientHeaderField
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

  function IngredientHeaderField({
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

  function sortIngredients(key) {
    if (key === sortKey) {
      setIngredients(
        [...ingredients].sort((a, b) => {
          if (a[key] < b[key]) {
            return 1
          }
          if (a[key] > b[key]) {
            return -1
          }
          return 0
        })
      )
      setSortKey(key + "Reverse")
    } else {
      setIngredients(
        [...ingredients].sort((a, b) => {
          if (a[key] < b[key]) {
            return -1
          }
          if (a[key] > b[key]) {
            return 1
          }
          return 0
        })
      )
      setSortKey(key)
    }
  }

  function editIngredient(ingredient) {
    setEditing(ingredient)
  }

  function closePopup() {
    setEditing(null)
  }

  function submitEdit() {
    setEditing(null)
  }

  function cancelEdit() {
    setEditing(null)
  }

  function deleteIngredient(id) {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }
}
