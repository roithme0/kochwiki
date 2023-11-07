import IngredientsHeaderField from "./IngredientsHeaderField"

export default function IngredientsHeader({
  ingredients,
  sortKey = "",
  updateSortKey = null,
}) {
  // render header for table of ingredients

  const classNames = {
    name: "",
    brand: "",
    unit: "unit",
    kcal: "makro",
    carbs: "makro",
    protein: "makro",
    fat: "makro",
  }

  const verboseNames = ingredients[0].verbose_names
  console.debug("verboseNames: ", verboseNames)

  return (
    <>
      <div className="header">
        {Object.keys(verboseNames).map(
          name =>
            !(name === "id") && (
              <IngredientsHeaderField
                fieldName={name}
                value={verboseNames[name]}
                classNames={classNames[name]}
                sortKey={sortKey}
                updateSortKey={updateSortKey}
              />
            )
        )}
      </div>
      <div className="buttons-wrapper">
        <div></div>
        <div></div>
      </div>
    </>
  )
}
