import "./Ingredients.css"

import Header from "../components/Header.js"
import DisplayIngredient from "../components/DisplayIngredient.js"
import EditIngredient from "../components/EditIngredient.js"
import Footer from "../components/Footer.js"

import { useState, useEffect } from "react"
import axios from "axios"

export default function Ingredients() {
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }
  const [ingredients, setIngredients] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8000/recipes/ingredients/").then(response => {
      setIngredients(response.data)
      console.debug(response.data)
    })
  }, [])

  return (
    <>
      <Header headline={headline} back={back} />
      <main className="ingredients">
        <article className="ingredients-wrapper">
          {ingredients.map(ingredient => (
            <div key={ingredient.id} className="ingredient-wrapper">
              {editing === ingredient.id ? (
                <EditIngredient ingredient={ingredient} />
              ) : (
                <DisplayIngredient
                  ingredient={ingredient}
                  editIngredient={editIngredient}
                  deleteIngredient={deleteIngredient}
                />
              )}
            </div>
          ))}
        </article>
      </main>
      <Footer />
    </>
  )

  function editIngredient(id) {
    setEditing(id)
  }

  function deleteIngredient(id) {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }
}
