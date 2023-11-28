import axios from "axios"

export default async function putIngredient({
  form,
  setFunction = () => {},
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.put(
      `http://localhost:8000/ingredients/ingredient/update/${form.id}/`,
      form
    )
    const updatedIngredient = response.data
    console.debug("updated ingredient: ", response)
    setFunction(updatedIngredient)
    callback({ updatedIngredient })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: failed to update ingredient: ", errorResponse)
    errorCallback({ errorResponse })
  }
}
