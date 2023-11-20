import css from "./Recipes.module.css"

import { useEffect } from "react"

export default function Recipes({ setHeadline, setBack }) {
  useEffect(() => {
    setHeadline("Rezepte")
    setBack({ url: "/", visibility: "" })
  }, [])

  return (
    <main>
      <article></article>
    </main>
  )
}
