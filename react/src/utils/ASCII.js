export function isIntegerKeyCode(charCode) {
  const NumbersBottom = 48
  const NumbersTop = 57
  return charCode >= NumbersBottom && charCode <= NumbersTop
}

export function isFloatKeyCode(charCode) {
  const NumbersBottom = 48
  const NumbersTop = 57
  const Comma = 188
  const Dot = 190
  return (
    (charCode >= NumbersBottom && charCode <= NumbersTop) ||
    charCode === Comma ||
    charCode === Dot
  )
}

export function isFunctionalKeyCode(charCode) {
  const Tab = 9
  const Enter = 13
  const Backspace = 8
  const Delete = 46
  const STRG = 17
  const Left = 37
  const Right = 39
  return (
    charCode === Tab ||
    charCode === Enter ||
    charCode === Backspace ||
    charCode === Delete ||
    charCode === STRG ||
    charCode === Left ||
    charCode === Right
  )
}
