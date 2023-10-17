import "./Recipes.css"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

import imageOffOutline from "../assets/images/mdi/image-off-outline.png"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Recipes() {
  const headline = "Rezepte"
  const back = { url: "/", visibility: "" }
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/recipes/recipes/").then(response => {
      setRecipes(response.data)
      console.debug(response.data)
    })
  }, [])

  return (
    <>
      <Header headline={headline} back={back} />
      <main className="recipes">
        <article className="main-content">
          {recipes.map(recipe => (
            <Link to="#" key={recipe.id}>
              {recipe.image ? (
                <img src={recipe.image} alt={recipe.name} />
              ) : (
                <img src={imageOffOutline} alt={recipe.name} />
              )}
              <span>{recipe.name}</span>
            </Link>
          ))}
        </article>
      </main>
      <Footer />
    </>
  )
}
