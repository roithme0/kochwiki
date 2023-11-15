import "./Home.css"

import Recipes from "../assets/images/recipes.png"
import Ingredients from "../assets/images/ingredients.png"

import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Home({ setHeadline, setBack }) {
  // render home page

  useEffect(() => {
    setHeadline("Startseite")
    setBack({ url: "/", visibility: "hidden" })
  }, [])

  return (
    <main className="home">
      <nav className="nav-wrapper">
        <Link to="recipes/" className="recipes-link">
          <img src={Recipes} alt="Rezepte" />
        </Link>
        <Link to="ingredients/" className="ingredients-link">
          <img src={Ingredients} alt="Zutaten" />
        </Link>
      </nav>
    </main>
  )
}
