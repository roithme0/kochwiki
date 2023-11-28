import axios from "axios"

export default async function deleteIngredient({
  id,
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/ingredients/ingredient/delete/${id}/`
    )
    console.debug("deleted ingredient: ", response)
    callback({ deletedIngredientID: id })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: failed to delete ingredient: ", errorResponse)
    errorCallback({ errorResponse: error.response })
  }
}
