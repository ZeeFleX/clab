import { IInputMessage } from 'components/Input/Input.types'

export const confirmPasswordValidator = (
  value: string,
  firstPassword: string
): IInputMessage => {
  const isValid = value === firstPassword
  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 6,
    type: 'error',
    message: 'Пароли не совпадают',
  }
}

export default confirmPasswordValidator
