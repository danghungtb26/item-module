export const removeUndefined: <T extends Record<string, any>>(
  value: T
) => Record<keyof T, any> = value => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(value).forEach(key => (value[key] === undefined ? delete value[key] : {}))
  return value
}
