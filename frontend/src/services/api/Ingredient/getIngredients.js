import axios from "axios"

export default async function getIngredients({
  setFunction = () => {},
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.get("http://localhost:8000/ingredients/")
    const fetchedIngredients = response.data
    console.debug("fetched ingredients: ", response)
    setFunction(fetchedIngredients)
    callback({ fetchedIngredients })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: could not fetch ingredients", errorResponse)
    errorCallback({ errorResponse })
  }
}
