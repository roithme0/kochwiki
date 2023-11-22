import axios from "axios"

export default async function putIngredient({
  form,
  callback = null,
  errorCallback = null,
}) {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/ingredient/update/${form.id}/`,
      form
    )
    console.debug("updated ingredient: ", response)
    const updatedIngredient = response.data
    callback && callback({ updatedIngredient })
  } catch (error) {
    console.error("ERROR: failed to update ingredient: ", error.response)
    errorCallback && errorCallback({ errorResponse: error.response })
  }
}
