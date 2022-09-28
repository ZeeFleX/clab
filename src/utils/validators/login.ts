import { IInputMessage } from 'components/Input/Input.types'

import { emailValidator, phoneValidator } from './'

export const loginValidator = (value: string): IInputMessage => {
  const isValid = !emailValidator(value).code || !phoneValidator(value).code

  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 1,
    type: 'error',
    message: 'Введите корректный email или номер телефона для входа',
  }
}

export default loginValidator
