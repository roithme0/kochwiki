import "./Ingredients.css"

import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"
import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"
import sort from "../assets/images/mdi/sort.png"

import Popup from "../components/Popup"
import EditIngredientPopup from "../components/popups/EditIngredientPopup"
import DeleteIngredientPopup from "../components/popups/DeleteIngredientPopup"
import Button from "../components/ui/Button"

import { getIngredient, getIngredients } from "../services/api/Ingredient"

import { useState, useEffect } from "react"

export default function Ingredients({ setHeadline, setBack }) {
  useEffect(() => {
    setHeadline("Zutaten")
  }, [])

  useEffect(() => {
    setBack({ url: "/", visibility: "" })
  }, [])

  const [ingredients, setIngredients] = useState([])
  const [sortKey, setSortKey] = useState(null)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    getIngredients({
      callback: sortIngredients,
      callbackProps: { key: "name" },
    })
  }, [])

  const verbose_names = ingredients.length ? ingredients[0].verbose_names : {}
  return (
    <>
      <main className="ingredients">
        {ingredients.length ? (
          <IngredientsGrid />
        ) : (
          <p>Keine Zutaten gefunden.</p>
        )}
      </main>
      {editing && (
        <Popup
          Component={EditIngredientPopup}
          title={"Zutat bearbeiten"}
          ingredient={editing}
          closeHandler={closeEditPopup}
          closeHandlerProps={{ id: editing.id }}
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
      )}
    </>
  )

  function IngredientsGrid() {
    return (
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
    )
  }

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

  function DisplayIngredient({ ingredient, editIngredient, deleteIngredient }) {
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
            clickHandler={() => deleteIngredient({ ingredient: ingredient })}
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

  async function closeEditPopup({ updatedIngredient = null }) {
    updatedIngredient &&
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

  function deleteIngredient({ ingredient }) {
    setDeleting(ingredient)
    document
      .getElementById("ingredient-wrapper-" + ingredient.id)
      .classList.add("deleting")
  }

  async function closeDeletePopup({ id = null, errorResponse = null }) {
    if (id) {
      // deleting was successfull
      setIngredients(ingredients.filter(i => i.id !== id))
    } else {
      // deleting failed
      document
        .getElementById("ingredient-wrapper-" + deleting.id)
        .classList.remove("deleting")
    }
    setDeleting(null)
  }
}
