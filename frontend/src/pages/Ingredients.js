import "./Ingredients.css"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Ingredients() {
  const headline = "Zutaten"
  const back = { url: "/", visibility: "" }
  const [ingredients, setIngredients] = useState([])

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
            <div key={ingredient.id} className="ingredient">
              <span>{ingredient.name}</span>
              <span>{ingredient.brand ? ingredient.band : "/"}</span>
              <span>{ingredient.kcal ? ingredient.kcal : "/"}</span>
              <span>{ingredient.carbs ? ingredient.kcal : "/"}</span>
              <span>{ingredient.protein ? ingredient.protein : "/"}</span>
              <span>{ingredient.fat ? ingredient.fat : "/"}</span>
            </div>
          ))}
        </article>
      </main>
      <Footer />
    </>
  )
}
