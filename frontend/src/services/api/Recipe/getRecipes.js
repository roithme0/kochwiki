import axios from "axios"

export default async function getRecipes({
  setFunction = () => {},
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.get("http://localhost:8000/recipes/recipes/")
    const fetchedRecipes = response.data
    console.debug("fetched recipes: ", response)
    setFunction(fetchedRecipes)
    callback({ fetchedRecipes })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: could not fetch recipes", errorResponse)
    errorCallback({ errorResponse })
  }
}
