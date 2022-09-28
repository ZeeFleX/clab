export interface IButtonProps {
  text: string
  onClick?: () => void
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  type?: 'submit' | 'reset' | undefined
  [props: string]: any
}
