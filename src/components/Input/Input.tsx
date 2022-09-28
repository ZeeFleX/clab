import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import { useObserver } from 'mobx-react-lite'

import { IInputMessage, IInputProps } from './Input.types'
import styles from './Input.module.sass'

export const Input: FC<IInputProps> = ({ props, store, field }) => {
  const [value, messages] = useObserver(() => [
    store.fields[field.name].value,
    store.fields[field.name].messages,
  ])
  const { type, placeholder, onChange, name } = field
  const [focused, setFocused] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'date') {
      setFocused(true)
    }
  }, [])

  const onChangeHandler = (
    event: SyntheticEvent<HTMLInputElement>,
    field: string
  ) => {
    onChange(event, field)
  }

  const onFocus = (event: any) => {
    setFocused(true)
    if (type === 'password') {
      event.target.setAttribute('autocomplete', 'new-password')
    }
  }

  return (
    <>
      <div
        className={`${styles.inputWrapper} ${
          focused || !!value ? styles.focusedWrapper : ''
        } ${messages.length ? styles.inputError : ''}`}
      >
        {placeholder && <label>{placeholder}</label>}
        <input
          type={type}
          value={value}
          onFocus={onFocus}
          onBlur={() => setFocused(false)}
          onChange={(event) => onChangeHandler(event, name)}
          name={name}
          autoComplete="new-password"
          {...props}
        />
      </div>
      <div className={styles.inputMessages}>
        {messages.map((message: IInputMessage, index: number) => (
          <p
            key={index}
            className={`${styles.message} ${
              messages.length ? styles.messageError : ''
            }`}
          >
            {message?.message}
          </p>
        ))}
      </div>
    </>
  )
}

export default Input
