import { makeAutoObservable } from 'mobx'
import { SyntheticEvent } from 'react'

import {
  passwordValidator,
  confirmPasswordValidator,
  collectStoreFormData,
} from 'utils'

import FormsStore from './index'
import { InputType } from './form.types'
import { IInputMessage } from 'components/Input/Input.types'

export default class PasswordRecovery2 {
  formsStore?: FormsStore
  fields: { [index: string]: InputType }
  onSubmit: (event?: SyntheticEvent) => boolean
  submitButtonText?: string
  isValid: boolean | null

  constructor(formsStore?: FormsStore) {
    this.formsStore = formsStore
    this.submitButtonText = 'Отправить'
    this.isValid = true
    this.fields = {
      ['new-password']: {
        placeholder: 'Новый пароль',
        name: 'new-password',
        type: 'password',
        value: '',
        validators: [passwordValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
      confirmPassword: {
        placeholder: 'Повторите новый пароль',
        name: 'confirmPassword',
        type: 'password',
        value: '',
        validators: [
          passwordValidator,
          (value: string) =>
            confirmPasswordValidator(value, this.fields['new-password'].value),
        ],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
    }

    this.onSubmit = (event?: SyntheticEvent) => {
      event?.preventDefault()
      this.validateForm()

      if (this.isValid) {
        const uiStore = this.formsStore?.rootStore?.UIStore

        uiStore?.createFlash({
          type: 'success',
          content: 'Ваш пароль был успешно изменен',
        })

        return true
      }
      return false
    }
    makeAutoObservable(this)
  }

  inputChangeHandler(
    event: SyntheticEvent<HTMLInputElement>,
    fieldName: string
  ) {
    const value = event.currentTarget.value
    this.validateField(fieldName, value)
    this.fields[fieldName].value = value
  }

  validateField(fieldName: string, value: string): IInputMessage[] {
    const messages = this.fields[fieldName].validators
      ?.map((validator) => validator(value))
      .filter((message: IInputMessage) => message.code)
    this.fields[fieldName].messages = messages
    return messages
  }

  validateForm(): boolean {
    Object.values(this.fields).forEach(({ name, value }) => {
      this.validateField(name, value)
    })
    const formIsValid = Object.values(this.fields).every(
      (field) => !field.messages.length
    )
    this.isValid = formIsValid
    return formIsValid
  }
}
