import "./Home.css"

import Recipes from "../assets/images/recipes.png"
import Ingredients from "../assets/images/ingredients.png"

export default function Home() {
  return (
    <section className="main-content">
      <a href="#" className="recipes-anchor">
        <img src={Recipes} alt="Rezepte" />
      </a>
      <a href="#" className="ingredients-anchor">
        <img src={Ingredients} alt="Zutaten" />
      </a>
    </section>
  )
}
