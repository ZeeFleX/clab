import { InputType } from 'stores/forms/form.types'

export const collectStoreFormData = (fields: {
  [index: string]: InputType
}) => {
  return Object.values(fields).reduce((acc, current: InputType) => {
    acc[current.name] = current.value
    return acc
  }, {} as { [index: string]: string })
}

export default collectStoreFormData
