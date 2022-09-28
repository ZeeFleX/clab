import { IInputMessage } from 'components/Input/Input.types'
import { CODE_LENGTH } from 'constants/signup'

export const codeValidator = (value: string): IInputMessage => {
  const regexp = `[0-9]{${CODE_LENGTH}}`
  const isValid = value.length === CODE_LENGTH && value.match(regexp)

  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 3,
    type: 'error',
    message: `Код должен состоять из ${CODE_LENGTH} цифр`,
  }
}

export default codeValidator
