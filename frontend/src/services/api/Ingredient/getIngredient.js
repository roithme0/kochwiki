import axios from "axios"

export default async function getIngredient({
  id,
  setFunction = null,
  callback = null,
  callbackProps = {},
  errorCallback = null,
  errorCallbackProps = {},
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
    errorCallbackProps.errorResponse = error.response
    errorCallback && errorCallback(errorCallbackProps)
    return { errorResponse: error.response, success: false }
  }
}
