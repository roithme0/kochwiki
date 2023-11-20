import axios from "axios"

export default async function getIngredient({
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
    return { fetchedIngredient: response.data, success: true }
  } catch (error) {
    console.error("ERROR: could not fetch ingredient", error.response)
    callbackErrorProps.errorResponse = error.response
    callbackError && callbackError(callbackErrorProps)
    return { errorResponse: error.response, success: false }
  }
}
