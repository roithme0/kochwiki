import "./Recipes.css"

import Header from "../components/Header.js"
import Footer from "../components/Footer.js"

export default function Home() {
  const headline = "Rezepte"
  const back = { url: "/", visibility: "" }
  return (
    <>
      <Header headline={headline} back={back} />
      <main>
        <section className="main-content"></section>
      </main>
      <Footer />
    </>
  )
}
