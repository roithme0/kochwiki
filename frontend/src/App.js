import "./App.css"

import Header from "./components/Header.js"
import Footer from "./components/Footer.js"

export default function App() {
  return (
    <>
      <Header headline="home" />
      <div className="content"></div>
      <Footer />
    </>
  )
}
