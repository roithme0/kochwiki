import "./IngredientsFilter.css"

import Select from "../Select/Select"

export default function IngredientsFilter({ setFilter }) {
  const choices = ["g", "ml", "Stk."]

  return <Select choices={choices} />
}
