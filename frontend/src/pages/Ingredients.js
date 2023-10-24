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

import { fetchIngredient, fetchIngredients } from "../services/api/Ingredient"

import { useState, useEffect } from "react"

export default function Ingredients() {
  // page header
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }

  const [ingredients, setIngredients] = useState([])
  const [sortKey, setSortKey] = useState(null)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchIngredients({ callback: sortIngredients, kwargs: { key: "name" } })
  }, [])

  if (ingredients.length === 0) return <span>Keine Zutaten gefunden.</span>

  const labels = ingredients[0].labels
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
            value={labels.name}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            fieldName="brand"
            value={labels.brand}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="kcal"
            value={labels.kcal}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="carbs"
            value={labels.carbs}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName={labels.protein}
            value="Protein"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="fat"
            value={labels.fat}
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
          onClick={() => clickHandler({ key: fieldName })}
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
            clickHandler={() => editIngredient({ ingredient: ingredient })}
            classNames="edit"
          />
          <Button
            type={"neutral"}
            img={trashBin}
            clickHandler={() => deleteIngredient({ id: ingredient.id })}
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

  function sortIngredients({ key, fetchedIngredients = ingredients }) {
    const reverseFactor = key === sortKey ? -1 : 1
    let res = 0
    setIngredients(
      [...fetchedIngredients].sort((a, b) => {
        if (a[key] < b[key]) {
          res = -1
        } else if (a[key] > b[key]) {
          res = 1
        } else {
          res = 0
        }
        return res * reverseFactor
      })
    )
    setSortKey(reverseFactor === -1 ? key + "Reverse" : key)
  }

  function editIngredient({ ingredient }) {
    setEditing(ingredient)
    document
      .getElementById("ingredient-wrapper-" + ingredient.id)
      .classList.add("editing")
  }

  function closePopup({ event = null }) {
    event && event.preventDefault() // for closing popup using form button
    fetchIngredient({
      id: editing.id,
      callback: updateIngredients,
    })
  }

  function updateIngredients({ fetchedIngredient }) {
    setIngredients(
      ingredients.map(ingredient => {
        if (ingredient.id === fetchedIngredient.id) {
          return fetchedIngredient
        } else {
          return ingredient
        }
      })
    )
    document
      .getElementById("ingredient-wrapper-" + editing.id)
      .classList.remove("editing")
    setEditing(null)
  }

  function deleteIngredient({ id }) {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }
}
