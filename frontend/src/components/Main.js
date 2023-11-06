import "./Main.css"

import Header from "./Header"
import Footer from "./Footer"

import { useState } from "react"

export default function Main({ Component }) {
  const [headline, setHeadline] = useState("")
  const [back, setBack] = useState({ url: "", visibility: "" })

  const props = {
    setHeadline: setHeadline,
    setBack: setBack,
  }

  return (
    <>
      <Header headline={headline} back={back} />
      <Component {...props} />
      <Footer />
    </>
  )
}
