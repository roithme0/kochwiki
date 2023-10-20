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
        <span className="display-field">{ingredient.name}</span>
        <span className="display-field">
          {ingredient.brand ? ingredient.brand : "/"}
        </span>
        <span className="display-field">
          {ingredient.kcal ? ingredient.kcal : "/"}
        </span>
        <span className="display-field">
          {ingredient.carbs ? ingredient.carbs : "/"}
        </span>
        <span className="display-field">
          {ingredient.protein ? ingredient.protein : "/"}
        </span>
        <span className="display-field">
          {ingredient.fat ? ingredient.fat : "/"}
        </span>
      </div>
      <div className="buttons-wrapper">
        <img
          src={pencil}
          onClick={() => editIngredient(ingredient)}
          className="edit"
        />
        <img
          src={trashBin}
          onClick={() => deleteIngredient(ingredient.id)}
          className="delete"
        />
      </div>
    </>
  )
}
