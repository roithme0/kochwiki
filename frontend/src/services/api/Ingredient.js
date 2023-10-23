import axios from "axios"

export async function fetchIngredient({
  id,
  setFunction = null,
  callback = null,
  kwargs = null,
}) {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/ingredient/${id}/`
    )
    console.debug("fetched ingredient: ", response.data)
    setFunction && setFunction(response.data)
    !kwargs && (kwargs = {})
    kwargs.ingredient = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch ingredient", error)
  }
}

export async function fetchIngredients({
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
