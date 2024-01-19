/* eslint-disable @typescript-eslint/no-explicit-any */
export function updateObject(oldObject: any, newValues: any) {
  return Object.assign({}, oldObject, newValues)
}
