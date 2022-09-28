import React, { FC } from 'react'

import { IStepperProps } from './Stepper.types'

export const Stepper: FC<IStepperProps> = ({ steps, currentStep }) => {
  return <>{steps.find((stepElement, index) => index === currentStep)}</>
}

export default Stepper
