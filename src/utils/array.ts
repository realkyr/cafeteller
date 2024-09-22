const isArrayHasDuplicateEl = (array1: unknown[], array2: unknown[]) => {
  if (!array1) array1 = []
  if (!array2) array2 = []
  for (const el of array1) {
    if (array2.includes(el)) return true
  }
  return false
}

const isArrayNotEmpty = (array: unknown) =>
  array && Array.isArray(array) && array.length

export { isArrayHasDuplicateEl, isArrayNotEmpty }
