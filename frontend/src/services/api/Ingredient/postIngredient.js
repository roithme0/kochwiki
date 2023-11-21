import axios from "axios"

export default async function postIngredient({
  form,
  callback = null,
  callbackProps = {},
  errorCallback = null,
  errorCallbackProps = {},
}) {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/ingredient/create/`,
      form
    )
    console.debug("created ingredient: ", response)
    const createdIngredient = response.data
    callbackProps.createdIngredient = createdIngredient
    callback && callback(callbackProps)
    return { createdIngredient: createdIngredient, success: true }
  } catch (error) {
    console.error("ERROR: failed to create ingredient: ", error.response)
    errorCallbackProps.errorResponse = error.response
    errorCallback && errorCallback(errorCallbackProps)
    return { errorResponse: error.response, success: false }
  }
}
