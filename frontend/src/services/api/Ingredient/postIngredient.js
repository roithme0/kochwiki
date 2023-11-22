import axios from "axios"

export default async function postIngredient({
  form,
  callback = null,
  errorCallback = null,
}) {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/ingredient/create/`,
      form
    )
    console.debug("created ingredient: ", response)
    const createdIngredient = response.data
    callback && callback({ createdIngredient })
  } catch (error) {
    console.error("ERROR: failed to create ingredient: ", error.response)
    errorCallback && errorCallback({ errorResponse: error.response })
  }
}
