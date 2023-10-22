import "./EditIngredientPopup.css"

import check from "../../assets/images/mdi/check.png"
import cancel from "../../assets/images/mdi/cancel.png"

import Field from "../ui/Field.js"
import Button from "../ui/Button.js"

export default function EditIngredientPopup({
  submitEdit,
  cancelEdit,
  ingredient,
}) {
  const name = ingredient.name
  const brand = ingredient.brand ? ingredient.brand : ""
  const kcal = ingredient.kcal ? ingredient.kcal : ""
  const carbs = ingredient.carbs ? ingredient.carbs : ""
  const protein = ingredient.protein ? ingredient.protein : ""
  const fat = ingredient.fat ? ingredient.fat : ""

  return (
    <>
      <div className="edit-ingredient">
        <form key={ingredient.id} className="ingredient-form">
          <Field
            label={"Name"}
            name={"name"}
            type={"text"}
            initialValue={name}
          />
          <Field
            label={"Marke"}
            name={"brand"}
            type={"text"}
            initialValue={brand}
          />
          <Field
            label={"Kalorien"}
            name={"kcal"}
            type={"number"}
            initialValue={kcal}
            unit={"kcal"}
          />
          <Field
            label={"Kohlenhydrate"}
            name={"carbs"}
            type={"number"}
            initialValue={carbs}
            unit={"g"}
          />
          <Field
            label={"Protein"}
            name={"protein"}
            type={"number"}
            initialValue={protein}
            unit={"g"}
          />
          <Field
            label={"Fett"}
            name={"fat"}
            type={"number"}
            initialValue={fat}
            unit={"g"}
          />
        </form>
        <div className="buttons-wrapper">
          <Button
            type={"positive"}
            img={check}
            onClick={submitEdit}
            classNames={"save-ingredient"}
          />
          <Button
            type={"negative"}
            img={cancel}
            onClick={cancelEdit}
            classNames={"cancel-ingredient"}
          />
        </div>
      </div>
    </>
  )
}
