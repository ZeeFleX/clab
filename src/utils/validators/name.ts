import { IInputMessage } from 'components/Input/Input.types'

export const nameValidator = (value: string): IInputMessage => {
  const isValid = value.match(/^[a-zA-Zа-яА-Я-]+$/)
  if (isValid) {
    return { code: 0 }
  }
  return {
    code: 5,
    type: 'error',
    message:
      'Введите имя или фамилию одним словом или через дефис. Не используйте цифры и специальные символы',
  }
}

export default nameValidator
