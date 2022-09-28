import { IInputMessage } from 'components/Input/Input.types'

export const requiredValidator = (value: string): IInputMessage => {
  const isValid = !!value.length
  if (isValid) {
    return { code: 0 }
  }
  return { code: 2, type: 'error', message: 'Поле обязательно для заполнения' }
}

export default requiredValidator
