import { useState, useEffect } from "react"

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    // track window width
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    console.debug("windowWidth: ", width)
    return () => window.removeEventListener("resize", handleResize)
  })

  return width
}
