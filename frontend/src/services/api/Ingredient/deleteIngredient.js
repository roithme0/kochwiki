import axios from "axios"

export default async function deleteIngredient({
  id,
  callback = null,
  errorCallback = null,
}) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/recipes/ingredient/delete/${id}/`
    )
    console.debug("deleted ingredient: ", response)
    callback && callback({ deletedIngredientID: id })
    return { deletedIngredientID: id, success: true }
  } catch (error) {
    console.error("ERROR: failed to delete ingredient: ", error.response)
    errorCallback && errorCallback({ errorResponse: error.response })
    return { errorResponse: error.response, success: false }
  }
}
