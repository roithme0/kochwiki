import "./App.css"

import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Home from "./pages/Home.js"

export default function App() {
  return (
    <>
      <Header headline="home" />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}
