import { makeAutoObservable } from 'mobx'
import { SyntheticEvent } from 'react'

import { phoneValidator, collectStoreFormData } from 'utils'

import FormsStore from './index'
import { InputType } from './form.types'
import { IInputMessage } from 'components/Input/Input.types'

export default class SignUp1 {
  formsStore?: FormsStore
  fields: { [index: string]: InputType }
  onSubmit: (event?: SyntheticEvent) => void
  submitButtonText?: string
  isValid: boolean | null

  constructor(formsStore?: FormsStore) {
    this.formsStore = formsStore
    this.submitButtonText = 'Получить код по SMS'
    this.isValid = true
    this.fields = {
      phone: {
        placeholder: 'Номер телефона',
        name: 'phone',
        type: 'text',
        value: '',
        validators: [phoneValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
    }

    this.onSubmit = async (event?: SyntheticEvent) => {
      event?.preventDefault()
      this.validateForm()

      if (this.isValid) {
        const userStore = this.formsStore?.rootStore?.userStore
        const values = collectStoreFormData(this.fields)

        const result = await userStore?.registrationNotifyPhone(
          values.phone as string
        )

        if (result instanceof Error) {
          return false
        }
        return true
      }
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
