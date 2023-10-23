import axios from "axios"

export async function fetchRecipes({
  setFunction = null,
  callback = null,
  kwargs = {},
}) {
  try {
    const response = await axios.get("http://localhost:8000/recipes/recipes/")
    console.debug("fetched recipes: ", response.data)
    setFunction && setFunction(response.data)
    kwargs.fetchedRecipes = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch recipes", error)
  }
}
