import { makeAutoObservable } from 'mobx'
import { SyntheticEvent } from 'react'

import {
  passwordValidator,
  nameValidator,
  requiredValidator,
  ageValidator,
  emailValidator,
  confirmPasswordValidator,
  collectStoreFormData,
} from 'utils'

import FormsStore from './index'
import { InputType } from './form.types'
import { IInputMessage } from 'components/Input/Input.types'

export default class SignUp3 {
  formsStore?: FormsStore
  fields: { [index: string]: InputType }
  onSubmit: (event: SyntheticEvent) => void
  submitButtonText?: string
  isValid: boolean | null

  constructor(formsStore?: FormsStore) {
    this.formsStore = formsStore
    this.submitButtonText = 'Далее'
    this.isValid = true
    this.fields = {
      lastname: {
        placeholder: 'Фамилия',
        name: 'lastname',
        type: 'text',
        value: '',
        validators: [nameValidator, requiredValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
      firstname: {
        placeholder: 'Имя',
        name: 'firstname',
        type: 'text',
        value: '',
        validators: [nameValidator, requiredValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
      birthdate: {
        placeholder: 'Дата рождения',
        name: 'birthdate',
        type: 'date',
        value: '',
        validators: [ageValidator, requiredValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
      email: {
        placeholder: 'Email',
        name: 'email',
        type: 'text',
        value: '',
        validators: [emailValidator, requiredValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
      ['new-password']: {
        placeholder: 'Придумайте пароль',
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
        placeholder: 'Повторите пароль',
        name: 'confirmPassword',
        type: 'password',
        value: '',
        validators: [
          passwordValidator,
          (value) =>
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

    this.onSubmit = async (event?: SyntheticEvent) => {
      event?.preventDefault()
      this.validateForm()

      if (this.isValid) {
        const userStore = this.formsStore?.rootStore?.userStore
        const { firstname, lastname, email, confirmPassword } =
          collectStoreFormData(this.fields)
        const code = this.formsStore?.signup2?.fields.code.value

        const result = await userStore?.registration(
          firstname,
          lastname,
          email,
          confirmPassword,
          code as string
        )

        if (result instanceof Error) {
          if (this.formsStore?.signin) {
            this.formsStore.signin.fields.login.value = email
          }

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
