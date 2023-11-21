import css from "./Search.module.css"

import { mdiMagnify, mdiClose } from "@mdi/js"
import Button from "../Button"
import { useEffect, useState, useRef } from "react"

export default function Search({ setSearch }) {
  const [searchLocal, setSearchLocal] = useState("")
  const searchRef = useRef(null)
  const searchFieldRef = useRef(null)

  useEffect(() => {
    // update search + look of search field
    setSearch(searchLocal)
    if (searchLocal.length > 0) {
      searchRef.current.classList.add(css.active)
    } else {
      searchRef.current.classList.remove(css.active)
    }
  }, [searchLocal])

  return (
    <div className={css.search} ref={searchRef}>
      <input
        type="text"
        value={searchLocal}
        placeholder="Name oder Marke suchen ..."
        className={css.searchField}
        ref={searchFieldRef}
        onChange={event => setSearchLocal(event.target.value)}
      />
      {searchLocal.length ? (
        <Button
          svg={mdiClose}
          className={css.clear}
          clickHandler={() => {
            setSearchLocal("")
            searchFieldRef.current.focus()
          }}
        />
      ) : (
        <Button
          svg={mdiMagnify}
          className={css.magnify}
          clickHandler={() => searchFieldRef.current.focus()}
        />
      )}
    </div>
  )
}
