import axios from "axios"

export async function getIngredient({
  id,
  setFunction = null,
  callback = null,
  callbackProps = {},
  callbackError = null,
  callbackErrorProps = {},
}) {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/ingredient/${id}/`
    )
    console.debug("fetched ingredient: ", response.data)
    setFunction && setFunction(response.data)
    callbackProps.fetchedIngredient = response.data
    callback && callback(callbackProps)
    return { fetchedIngredient: response.data }
  } catch (error) {
    console.error("ERROR: could not fetch ingredient", error.response)
    callbackErrorProps.errorResponse = error.response
    callbackError && callbackError(callbackErrorProps)
    return { errorResponse: error.response }
  }
}

export async function getIngredients({
  setFunction = null,
  callback = null,
  callbackProps = {},
  callbackError = null,
  callbackErrorProps = {},
}) {
  try {
    const response = await axios.get(
      "http://localhost:8000/recipes/ingredients/"
    )
    console.debug("fetched ingredients: ", response.data)
    setFunction && setFunction(response.data)
    callbackProps.fetchedIngredients = response.data
    callback && callback(callbackProps)
    return { fetchedIngredients: response.data }
  } catch (error) {
    console.error("ERROR: could not fetch ingredients", error.response)
    callbackErrorProps.errorResponse = error.response
    callbackError && callbackError(callbackErrorProps)
    return { errorResponse: error.response }
  }
}

export async function putIngredient({
  form,
  callback = null,
  callbackProps = {},
  callbackError = null,
  callbackErrorProps = {},
}) {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/ingredient/update/${form.id}/`,
      form
    )
    console.debug("updated ingredient: ", response)
    callbackProps.updatedIngredient = response.data
    callback && callback(callbackProps)
    return { updatedIngredient: response.data }
  } catch (error) {
    console.error("ERROR: failed to update ingredient: ", error.response)
    callbackErrorProps.errorResponse = error.response
    callbackError && callbackError(callbackErrorProps)
    return { errorResponse: error.response }
  }
}

export async function deleteIngredient({
  id,
  callback = null,
  callbackError = null,
  callbackProps = {},
  callbackErrorProps = {},
}) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/recipes/ingredient/delete/${id}/`
    )
    console.debug("deleted ingredient: ", response)
    callbackProps.deletedIngredientID = id
    callback && callback(callbackProps)
    return { deletedIngredientID: id }
  } catch (error) {
    console.error("ERROR: failed to delete ingredient: ", error.response)
    callbackErrorProps.errorResponse = error.response
    callbackError && callbackError(callbackErrorProps)
    return { errorResponse: error.response }
  }
}
