import Main from "./components/Main"
import Home from "./pages/Home"
import Ingredients from "./pages/Ingredients"
import Recipes from "./pages/Recipes"

import { Route, Routes } from "react-router-dom"

export default function App() {
  // render page inside of main component depending on route

  return (
    <Routes>
      <Route path="/" element={<Main Component={Home} />} />
      <Route path="ingredients/" element={<Main Component={Ingredients} />} />
      <Route path="recipes/" element={<Main Component={Recipes} />} />
    </Routes>
  )
}
