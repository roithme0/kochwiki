import "./Ingredients.css"

import Header from "../components/Header.js"
import DisplayIngredient from "../components/DisplayIngredient.js"
import Footer from "../components/Footer.js"
import Popup from "../components/Popup.js"
import EditIngredient from "../components/EditIngredient"

import { useState, useEffect } from "react"
import axios from "axios"

export default function Ingredients() {
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }
  const [ingredients, setIngredients] = useState([])
  const [editing, setEditing] = useState(null)
  const [sortKey, setSortKey] = useState("name")

  useEffect(() => {
    axios.get("http://localhost:8000/recipes/ingredients/").then(response => {
      setIngredients(response.data)
    })
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
