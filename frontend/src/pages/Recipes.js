import "./Recipes.css"

import imageOffOutline from "../assets/images/mdi/image-off-outline.png"

import Header from "../components/Header"
import Footer from "../components/Footer"

import { fetchRecipes } from "../services/api/Recipe"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Recipes() {
  // page header
  const headline = "Rezepte"
  const back = { url: "/", visibility: "" }

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes({ setFunction: setRecipes })
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
