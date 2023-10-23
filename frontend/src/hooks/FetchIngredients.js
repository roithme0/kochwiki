import axios from "axios"

export default async function FetchIngredients({
  setFunction = null,
  callback = null,
  kwargs = null,
}) {
  try {
    const response = await axios.get(
      "http://localhost:8000/recipes/ingredients/"
    )
    console.debug("fetched ingredients: ", response.data)
    setFunction && setFunction(response.data)
    !kwargs && (kwargs = {})
    kwargs.fetchedIngredients = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch ingredients", error)
  }
}
