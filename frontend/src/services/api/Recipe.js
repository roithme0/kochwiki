import axios from "axios"

// export async function fetchIngredient({
//   id,
//   setFunction = null,
//   callback = null,
//   kwargs = null,
// }) {
//   try {
//     const response = await axios.get(
//       `http://localhost:8000/recipes/ingredient/${id}/`
//     )
//     console.debug("fetched ingredient: ", response.data)
//     setFunction && setFunction(response.data)
//     !kwargs && (kwargs = {})
//     kwargs.ingredient = response.data
//     callback && callback(kwargs)
//     return response.data
//   } catch (error) {
//     console.error("ERROR: could not fetch ingredient", error)
//   }
// }

export async function fetchRecipes({
  setFunction = null,
  callback = null,
  kwargs = null,
}) {
  try {
    const response = await axios.get("http://localhost:8000/recipes/recipes/")
    console.debug("fetched recipes: ", response.data)
    setFunction && setFunction(response.data)
    !kwargs && (kwargs = {})
    kwargs.fetchedRecipes = response.data
    callback && callback(kwargs)
    return response.data
  } catch (error) {
    console.error("ERROR: could not fetch recipes", error)
  }
}
