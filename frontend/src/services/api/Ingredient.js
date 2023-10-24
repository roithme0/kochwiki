import axios from "axios"

export async function fetchIngredient({
  id,
  setFunction = null,
  callback = null,
  callbackError = null,
  kwargs = {},
}) {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/ingredient/${id}/`
    )
    console.debug("fetched ingredient: ", response.data)
    setFunction && setFunction(response.data)
    kwargs.fetchedIngredient = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch ingredient", error.response)
    callbackError && callbackError({ errorResponse: error.response })
    return error.response
  }
}

export async function fetchIngredients({
  setFunction = null,
  callback = null,
  callbackError = null,
  kwargs = {},
}) {
  try {
    const response = await axios.get(
      "http://localhost:8000/recipes/ingredients/"
    )
    console.debug("fetched ingredients: ", response.data)
    setFunction && setFunction(response.data)
    kwargs.fetchedIngredients = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch ingredients", error.response)
    callbackError && callbackError({ errorResponse: error.response })
    return error.response
  }
}

export async function putIngredient({
  form,
  callback = null,
  callbackError = null,
  kwargs = {},
}) {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/ingredient/update/${form.id}/`,
      form
    )
    console.debug("updated ingredient: ", response)
    kwargs.updatedIngredient = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: failed to update ingredient: ", error.response)
    callbackError && callbackError({ errorResponse: error.response })
    return error.response
  }
}
