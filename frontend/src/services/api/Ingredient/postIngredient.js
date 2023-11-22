import axios from "axios"

export default async function postIngredient({
  form,
  setFunction = () => {},
  callback = () => {},
  errorCallback = () => {},
}) {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/ingredient/create/`,
      form
    )
    const createdIngredient = response.data
    console.debug("created ingredient: ", response)
    setFunction(createdIngredient)
    callback({ createdIngredient })
  } catch (error) {
    const errorResponse = error.response
    console.error("ERROR: failed to create ingredient: ", errorResponse)
    errorCallback({ errorResponse })
  }
}
