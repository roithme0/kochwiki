import pencil from "../assets/images/mdi/pencil.png"
import trashBin from "../assets/images/mdi/trash-bin.png"

export default function DisplayIngredient({
  ingredient,
  editIngredient,
  deleteIngredient,
}) {
  return (
    <>
      <div key={ingredient.id} className="ingredient">
        <span>{ingredient.name}</span>
        <span>{ingredient.brand ? ingredient.brand : "/"}</span>
        <span>{ingredient.kcal ? ingredient.kcal : "/"}</span>
        <span>{ingredient.carbs ? ingredient.carbs : "/"}</span>
        <span>{ingredient.protein ? ingredient.protein : "/"}</span>
        <span>{ingredient.fat ? ingredient.fat : "/"}</span>
      </div>
      <img
        src={pencil}
        onClick={() => editIngredient(ingredient.id)}
        className="edit-ingredient"
      />
      <img
        src={trashBin}
        onClick={() => deleteIngredient(ingredient.id)}
        className="delete-ingredient"
      />
    </>
  )
}
