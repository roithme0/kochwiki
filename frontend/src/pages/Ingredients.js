import "./Ingredients.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"
import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"
import sort from "../assets/images/mdi/sort.png"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Popup from "../components/Popup"
import EditIngredientPopup from "../components/popups/EditIngredientPopup"
import Button from "../components/ui/Button"

import fetchIngredients from "../hooks/fetchIngredients"
import fetchIngredient from "../hooks/fetchIngredient"

import { useState, useEffect } from "react"

export default function Ingredients() {
  // page header
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }

  const [ingredients, setIngredients] = useState([])
  const [editing, setEditing] = useState(null)
  const [sortKey, setSortKey] = useState("name")

  useEffect(() => {
    fetchIngredients(setIngredients)
  }, [])

  return (
    <>
      <Header headline={headline} back={back} />
      <main className="ingredients">
        <article className="ingredients-grid">
          <div className="header-wrapper">
            <DisplayIngredientHeader
              clickHandler={sortIngredients}
              sortKey={sortKey}
            />
          </div>
          <div className="ingredients-wrapper">
            {ingredients.map(ingredient => (
              <div
                key={ingredient.id}
                className="ingredient-wrapper"
                id={"ingredient-wrapper-" + ingredient.id}
              >
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
          Component={EditIngredientPopup}
          title={"Zutat bearbeiten"}
          ingredient={editing}
        ></Popup>
      )}
    </>
  )

  function DisplayIngredientHeader({ clickHandler, sortKey }) {
    return (
      <>
        <div className="header">
          <IngredientHeaderField
            fieldName="name"
            value="Name"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            fieldName="brand"
            value="Marke"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="kcal"
            value="Kalorien"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="carbs"
            value="Kohlenhydrate"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="protein"
            value="Protein"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="fat"
            value="Fett"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
        </div>
        <div className="buttons-wrapper">
          <div></div>
          <div></div>
        </div>
      </>
    )

    function IngredientHeaderField({
      classNames = "",
      fieldName,
      value,
      clickHandler,
      sortKey,
    }) {
      return (
        <div
          onClick={() => clickHandler(fieldName)}
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

  function DisplayIngredient({ ingredient, editIngredient, deleteIngredient }) {
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
            clickHandler={() => editIngredient(ingredient)}
            classNames="edit"
          />
          <Button
            type={"neutral"}
            img={trashBin}
            clickHandler={() => deleteIngredient(ingredient.id)}
            classNames="delete"
          />
        </div>
      </>
    )

    function IngredientField({ classNames = "", value, defaultValue }) {
      return (
        <span className={"ingredient-field " + classNames}>
          {value ? value : defaultValue}
        </span>
      )
    }
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
    document
      .getElementById("ingredient-wrapper-" + ingredient.id)
      .classList.add("editing")
  }

  function closePopup(event = null) {
    if (event) event.preventDefault() // for closing popup using form button
    fetchIngredient(editing.id, response => {
      const updatedIngredient = response
      const updatedIngredients = ingredients.map(ingredient => {
        if (ingredient.id === updatedIngredient.id) {
          return updatedIngredient
        } else {
          return ingredient
        }
      })
      setIngredients(updatedIngredients)
      document
        .getElementById("ingredient-wrapper-" + editing.id)
        .classList.remove("editing")
      setEditing(null)
    })
  }

  function deleteIngredient(id) {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }
}
