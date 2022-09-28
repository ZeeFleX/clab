import { InputType } from 'stores/forms/form.types'

export interface IInputProps {
  field: InputType
  [props: string]: any
}

export interface IInputMessage {
  code: number
  type?: 'error' | 'info' | 'warning'
  message?: string
}
