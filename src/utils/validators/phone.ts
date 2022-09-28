import { phone } from 'phone'

import { IInputMessage } from 'components/Input/Input.types'

export const phoneValidator = (value: string): IInputMessage => {
  const result = phone(value)
  const isValid = result.isValid

  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 3,
    type: 'error',
    message: 'Введите корретный номер телефона',
  }
}

export default phoneValidator
