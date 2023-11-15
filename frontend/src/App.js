import Main from "./components/Main/Main"

import Home from "./pages/Home/Home"
import Ingredients from "./pages/Ingredients/Ingredients"
import Recipes from "./pages/Recipes/Recipes"

import { Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main Component={Home} />} />
      <Route path="ingredients/" element={<Main Component={Ingredients} />} />
      <Route path="recipes/" element={<Main Component={Recipes} />} />
    </Routes>
  )
}
