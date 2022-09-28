import { SyntheticEvent } from 'react'

export interface IFormProps {
  store: any
  onSubmit: (event: SyntheticEvent) => void
  ref?: any
}
