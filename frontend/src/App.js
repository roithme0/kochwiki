import "./App.css"

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.js"
import Recipes from "./pages/Recipes.js"
import Ingredients from "./pages/Ingredients.js"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="recipes/" element={<Recipes />} />
      <Route path="ingredients/" element={<Ingredients />} />
    </Routes>
  )
}
