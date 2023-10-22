import axios from "axios"

export default function FetchIngredients(setFunction = null) {
  axios.get("http://localhost:8000/recipes/ingredients/").then(response => {
    setFunction && setFunction(response.data)
    return response.data
  })
}
