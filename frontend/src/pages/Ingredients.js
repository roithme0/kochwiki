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

import {
  getIngredient,
  getIngredients,
  deleteIngredient,
} from "../services/api/Ingredient"

import { useState, useEffect } from "react"

export default function Ingredients() {
  // page header
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }

  const [ingredients, setIngredients] = useState([])
  const [sortKey, setSortKey] = useState(null)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    getIngredients({
      callback: sortIngredients,
      callbackProps: { key: "name" },
    })
  }, [])

  if (ingredients.length === 0) return <span>Keine Zutaten gefunden.</span>

  const verbose_names = ingredients[0].verbose_names
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
                  destroyIngredient={destroyIngredient}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      {editing && (
        <Popup
          Component={EditIngredientPopup}
          title={"Zutat bearbeiten"}
          ingredient={editing}
          closeHandler={closeEditPopup}
          closeHandlerProps={{ id: editing.id }}
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
            value={verbose_names.name}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            fieldName="brand"
            value={verbose_names.brand}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames="unit"
            fieldName="unit"
            value={verbose_names.unit}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames={"makro"}
            fieldName="kcal"
            value={verbose_names.kcal}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames="makro"
            fieldName="carbs"
            value={verbose_names.carbs}
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames="makro"
            fieldName={verbose_names.protein}
            value="Protein"
            clickHandler={clickHandler}
            sortKey={sortKey}
          />
          <IngredientHeaderField
            classNames="makro"
            fieldName="fat"
            value={verbose_names.fat}
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

  function DisplayIngredient({
    ingredient,
    editIngredient,
    destroyIngredient,
  }) {
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
            clickHandler={() => editIngredient({ ingredient: ingredient })}
            classNames="edit"
          />
          <Button
            type={"neutral"}
            img={trashBin}
            clickHandler={() => destroyIngredient({ id: ingredient.id })}
            classNames="delete"
          />
        </div>
      </>
    )

    function IngredientField({ classNames = "", value, defaultValue = "/" }) {
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

  async function closeEditPopup({ id }) {
    // update ingredient in case it was changed
    // close popup
    const updatedIngredient = await getIngredient({ id: id })
    setIngredients(
      ingredients.map(ingredient => {
        if (ingredient.id === updatedIngredient.id) {
          return updatedIngredient
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

  function destroyIngredient({ id }) {
    deleteIngredient({
      id: id,
      callback: getIngredients,
      callbackProps: { setFunction: setIngredients },
    })
  }
}
