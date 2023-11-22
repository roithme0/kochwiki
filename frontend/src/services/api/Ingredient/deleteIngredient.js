import axios from "axios"

export default async function deleteIngredient({
  id,
  callback = null,
  errorCallback = null,
  callbackProps = {},
}) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/recipes/ingredient/delete/${id}/`
    )
    console.debug("deleted ingredient: ", response)
    callbackProps.deletedIngredientID = id
    callback && callback(callbackProps)
    return { deletedIngredientID: id, success: true }
  } catch (error) {
    console.error("ERROR: failed to delete ingredient: ", error.response)
    errorCallback && errorCallback({ errorResponse: error.response })
    return { errorResponse: error.response, success: false }
  }
}
