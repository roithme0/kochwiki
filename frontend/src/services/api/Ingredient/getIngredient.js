import axios from "axios"

export default async function getIngredient({
  id,
  setFunction = () => {},
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/ingredient/${id}/`
    )
    const fetchedIngredient = response.data
    console.debug("fetched ingredient: ", response)
    setFunction(fetchedIngredient)
    callback({ fetchedIngredient })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: could not fetch ingredient", errorResponse)
    errorCallback({ errorResponse })
  }
}
