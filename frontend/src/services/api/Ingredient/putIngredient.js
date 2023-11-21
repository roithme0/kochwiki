import axios from "axios"

export default async function putIngredient({
  form,
  callback = null,
  callbackProps = {},
  errorCallback = null,
  errorCallbackProps = {},
}) {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/ingredient/update/${form.id}/`,
      form
    )
    console.debug("updated ingredient: ", response)
    const updatedIngredient = response.data
    callbackProps.updatedIngredient = updatedIngredient
    callback && callback(callbackProps)
    return { updatedIngredient: updatedIngredient, success: true }
  } catch (error) {
    console.error("ERROR: failed to update ingredient: ", error.response)
    errorCallbackProps.errorResponse = error.response
    errorCallback && errorCallback(errorCallbackProps)
    return { errorResponse: error.response, success: false }
  }
}
