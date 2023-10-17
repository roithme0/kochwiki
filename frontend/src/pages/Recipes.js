import "./Recipes.css"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

import imageOffOutline from "../assets/images/mdi/image-off-outline.png"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Home() {
  const headline = "Rezepte"
  const back = { url: "/", visibility: "" }
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/recipes/list/").then(response => {
      setRecipes(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <>
      <Header headline={headline} back={back} />
      <main>
        <section className="main-content">
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
        </section>
      </main>
      <Footer />
    </>
  )
}
