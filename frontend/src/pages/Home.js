import "./Home.css"

import Recipes from "../assets/images/recipes.png"
import Ingredients from "../assets/images/ingredients.png"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

import { Link } from "react-router-dom"

export default function Home() {
  const headline = "Startseite"
  const back = { url: "/", visibility: "hidden" }
  return (
    <>
      <Header headline={headline} back={back} />
      <main className="home">
        <nav className="nav-wrapper">
          <Link to="/recipes" className="recipes-anchor">
            <img src={Recipes} alt="Rezepte" />
          </Link>
          <Link to="/ingredients" className="ingredients-anchor">
            <img src={Ingredients} alt="Zutaten" />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  )
}
