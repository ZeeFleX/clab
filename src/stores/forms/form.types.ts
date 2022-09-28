import { IInputMessage } from 'components/Input/Input.types'
import { SyntheticEvent } from 'react'

export type InputType = {
  placeholder?: string
  name: string
  value: string
  onChange: (event: SyntheticEvent<HTMLInputElement>, fieldName: string) => void
  type: 'text' | 'password' | 'date' | 'select' | 'checkbox' | 'radio' | 'phone'
  validators: ((value: string) => IInputMessage)[]
  messages: IInputMessage[]
}
