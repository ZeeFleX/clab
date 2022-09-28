import { fetchAction } from './'
import { APIEndpoints } from 'constants/api'

import {
  IRegistrationNotifyPhoneDTO,
  IRegistrationConfirmPhoneDTO,
  IRegistrationDTO,
  IAuthorizationDTO,
  IPasswordRecoveryDTO,
} from './user.types'

export const registrationNotifyPhoneAction = async (
  params: IRegistrationNotifyPhoneDTO
) => {
  const response = await fetchAction(
    'POST',
    APIEndpoints.registrationNotifyPhone,
    {
      command: 'REGISTRATION_NOTIFY_PHONE',
      checkInfo: { searchValue: `${params.phone.replace('+', '%2B')}` },
    }
  )
  return response
}

export const registrationConfirmPhoneAction = async (
  params: IRegistrationConfirmPhoneDTO
) => {
  const { phone, code } = params
  const response = await fetchAction(
    'POST',
    APIEndpoints.registrationNotifyPhone,
    {
      command: 'REGISTRATION_CONFIRM_PHONE',
      checkInfo: {
        searchValue: `${phone.replace('+', '%2B')}`,
        searchValue2: code,
      },
    }
  )
  return response
}

export const registrationAction = async (params: IRegistrationDTO) => {
  const response = await fetchAction(
    'POST',
    APIEndpoints.registration,
    params,
    'tsoft'
  )
  return response
}

export const authorizationAction = async (params: IAuthorizationDTO) => {
  const response = await fetchAction(
    'POST',
    APIEndpoints.authorization,
    {
      email: params.login,
      password: params.password,
    },
    'tsoft'
  )
  return response
}

export const passwordRecoveryAction = async (params: IPasswordRecoveryDTO) => {
  const response = await fetchAction(
    'POST',
    APIEndpoints.passwordRecovery,
    {
      email: params.login,
    },
    'tsoft'
  )
  return response
}
