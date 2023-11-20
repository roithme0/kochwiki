import css from "./Search.module.css"

import { mdiMagnify, mdiClose } from "@mdi/js"
import Button from "../Button"
import { useEffect, useState } from "react"

export default function Search({ setSearch }) {
  const [searchLocal, setSearchLocal] = useState("")

  useEffect(() => {
    // update search + look of search field
    setSearch(searchLocal)
    if (searchLocal.length > 0) {
      getSearchElement().classList.add(css.active)
    } else {
      getSearchElement().classList.remove(css.active)
    }
  }, [searchLocal])

  return (
    <div className={css.search} id={css.search}>
      <input
        type="text"
        value={searchLocal}
        placeholder="Name oder Marke suchen ..."
        className={css.searchField}
        id={css.searchField}
        onChange={event => setSearchLocal(event.target.value)}
      />
      {searchLocal.length ? (
        <Button
          svg={mdiClose}
          className={css.clear}
          clickHandler={() => {
            setSearchLocal("")
            getSearchFieldElement().focus()
          }}
        />
      ) : (
        <Button
          svg={mdiMagnify}
          className={css.magnify}
          clickHandler={() => getSearchFieldElement().focus()}
        />
      )}
    </div>
  )
}

function getSearchElement() {
  return document.getElementById(`${css.search}`)
}

function getSearchFieldElement() {
  return document.getElementById(`${css.searchField}`)
}
