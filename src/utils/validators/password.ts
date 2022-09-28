import { IInputMessage } from 'components/Input/Input.types'

export const passwordValidator = (value: string): IInputMessage => {
  const isValid = value.length >= 8
  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 2,
    type: 'error',
    message: 'Пароль должен содержать не менее 8 символов',
  }
}

export default passwordValidator
