import css from "./Search.module.css"

import { mdiMagnify } from "@mdi/js"
import Button from "../Button"
import { useEffect } from "react"

export default function Search({ setSearch }) {
  useEffect(() => {
    // set initial search
    setSearch("")
  }, [])

  return (
    <div className={css.search}>
      <input
        type="text"
        placeholder="Name oder Marke suchen ..."
        className={css.searchField}
        onChange={event => setSearch(event.target.value)}
      />
      <Button svg={mdiMagnify} className={css.magnify} />
    </div>
  )
}
