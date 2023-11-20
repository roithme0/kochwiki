import "./Main.css"

import Header from "../Header"
import Footer from "../Footer"
import { useState } from "react"

export default function Main({ Component }) {
  // render component plus header and footer

  const [headline, setHeadline] = useState("")
  const [back, setBack] = useState({ url: "", visibility: "" })
  const [buttons, setButtons] = useState([])

  return (
    <>
      <Header headline={headline} back={back} />
      <Component
        setHeadline={setHeadline}
        setBack={setBack}
        setButtons={setButtons}
      />
      <Footer buttons={buttons} />
    </>
  )
}
