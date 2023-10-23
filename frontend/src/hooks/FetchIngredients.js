import axios from "axios"

export default function FetchIngredients(setFunction = null, callback = null) {
  axios.get("http://localhost:8000/recipes/ingredients/").then(response => {
    console.debug("fetched ingredients: ", response.data)
    setFunction && setFunction(response.data)
    callback && callback(response.data)
  })
}
