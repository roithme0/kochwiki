import "./App.css"

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.js"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<h1>Rezepte</h1>} />
      <Route path="/ingredients" element={<h1>Zutaten</h1>} />
    </Routes>
  )
}
