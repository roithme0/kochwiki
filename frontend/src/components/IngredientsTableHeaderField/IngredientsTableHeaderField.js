import sortAscending from "../assets/images/mdi/sort-ascending.png"
import sortDescending from "../assets/images/mdi/sort-descending.png"
import sort from "../assets/images/mdi/sort.png"

export default function IngredientHeaderField({
  fieldName,
  value,
  classNames = "",
  sortKey = "",
  updateSortKey = null,
}) {
  // render header field for ingredients table

  return (
    <div
      key={fieldName}
      onClick={updateSortKey && (() => updateSortKey({ key: fieldName }))}
      className={"header-field-wrapper " + classNames}
    >
      <span className="header-field">{value}</span>
      {sortKey.key === fieldName ? (
        <img src={sortAscending}></img>
      ) : sortKey.key === fieldName + "Reverse" ? (
        <img src={sortDescending}></img>
      ) : (
        <img src={sort} className="hidden"></img>
      )}
    </div>
  )
}
