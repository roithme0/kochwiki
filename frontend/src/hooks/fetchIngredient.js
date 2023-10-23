import axios from "axios"

export default function FetchIngredient(
  id,
  setFunction = null,
  callback = null
) {
  axios
    .get(`http://localhost:8000/recipes/ingredient/${id}/`)
    .then(response => {
      console.debug("fetched ingredient: ", response.data)
      setFunction && setFunction(response.data)
      callback && callback(response.data)
    })
}
