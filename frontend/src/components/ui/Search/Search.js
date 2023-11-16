import "./Search.css"

import magnify from "../../../assets/images/mdi/magnify.png"
import Button from "../Button/Button"
import { useEffect } from "react"

export default function Search({ setSearch }) {
  useEffect(() => {
    // set initial search
    setSearch("")
  }, [setSearch])

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Name oder Marke suchen ..."
        className="search-field"
        onChange={event => setSearch(event.target.value)}
      />
      <Button type="neutral" img={magnify} alternativeText="Lupe" />
    </div>
  )
}
