import axios from "axios"

export default async function getIngredients({
  setFunction = null,
  callback = null,
  callbackProps = {},
  errorCallback = null,
  errorCallbackProps = {},
}) {
  try {
    const response = await axios.get(
      "http://localhost:8000/recipes/ingredients/"
    )
    console.debug("fetched ingredients: ", response.data)
    setFunction && setFunction(response.data)
    callbackProps.fetchedIngredients = response.data
    callback && callback(callbackProps)
    return { fetchedIngredients: response.data, success: true }
  } catch (error) {
    console.error("ERROR: could not fetch ingredients", error.response)
    errorCallbackProps.errorResponse = error.response
    errorCallback && errorCallback(errorCallbackProps)
    return { errorResponse: error.response, success: false }
  }
}
