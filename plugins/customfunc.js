const isArrayHasDuplicateEl = (array1, array2) => {
  if (!array1) array1 = []
  if (!array2) array2 = []
  for (const el of array1) {
    if (array2.includes(el)) return true
  }
  return false
}

const isArrayExist = (array) => (array && array.length)

export { isArrayHasDuplicateEl, isArrayExist }
