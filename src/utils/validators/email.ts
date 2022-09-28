import { IInputMessage } from 'components/Input/Input.types'

export const emailValidator = (value: string): IInputMessage => {
  const isValid = value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  if (isValid) {
    return { code: 0 }
  }
  return { code: 1, type: 'error', message: 'Введите корректный Email' }
}

export default emailValidator
