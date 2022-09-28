import moment from 'moment'

import { IInputMessage } from 'components/Input/Input.types'

export const ageValidator = (value: string): IInputMessage => {
  const minAge = 18
  const birthdate = moment(value)

  const isValid =
    moment(birthdate).isValid() &&
    birthdate.toDate() < moment().subtract(minAge, 'years').toDate()
  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 4,
    type: 'error',
    message: `Для регистрации вы должны быть старше ${minAge} лет`,
  }
}

export default ageValidator
