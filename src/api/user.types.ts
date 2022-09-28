export interface IRegistrationNotifyPhoneDTO {
  phone: string
}

export interface IRegistrationConfirmPhoneDTO {
  phone: string
  code: string
}

export interface IRegistrationDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  code: string
  type: number
}

export interface IAuthorizationDTO {
  login: string
  password: string
}

export interface IPasswordRecoveryDTO {
  login: string
}
