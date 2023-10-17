import "./Home.css"

import Recipes from "../assets/images/recipes.png"
import Ingredients from "../assets/images/ingredients.png"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

export default function Home() {
  const headline = "Startseite"
  return (
    <>
      <Header headline={headline} />
      <main>
        <section className="main-content">
          <a href="#" className="recipes-anchor">
            <img src={Recipes} alt="Rezepte" />
          </a>
          <a href="#" className="ingredients-anchor">
            <img src={Ingredients} alt="Zutaten" />
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
