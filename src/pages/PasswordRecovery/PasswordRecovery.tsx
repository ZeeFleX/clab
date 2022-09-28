import React, { useState, SyntheticEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RiArrowRightCircleFill } from 'react-icons/ri'

import { useStores } from 'hooks/useStores'
import { Modal, Form, Stepper, Button } from 'components'

import styles from './PasswordRecovery.module.sass'

export const PasswordRecovery = () => {
  const [step, setStep] = useState<number>(0)
  const navigate = useNavigate()
  const { formsStore } = useStores()

  const onSubmitStep1 = async (event: SyntheticEvent) => {
    const success = await formsStore?.passwordRecovery1?.onSubmit(event)
    if (success) {
      setStep(step + 1)
    }
  }

  const onSubmitStep2 = async (event: SyntheticEvent) => {
    const success = await formsStore?.passwordRecovery2?.onSubmit(event)

    if (success) {
      navigate('/signin')
    }
  }

  const steps = [
    <Modal
      defaultOpen={true}
      key={0}
      title="Забыли пароль"
      caption="Ничего страшного. Введите ваш логин в поле внизу"
    >
      {formsStore?.passwordRecovery1 && (
        <Form store={formsStore.passwordRecovery1} onSubmit={onSubmitStep1} />
      )}
    </Modal>,
    <Modal defaultOpen={true} key={1}>
      <h1 className={styles.passwordRecoverySuccessTitle}>
        Восстановление пароля
      </h1>
      <hr />
      <ul className={styles.passwordRecoverySuccessInfo}>
        <li>Мы отправили письмо со ссылкой для восстановления пароля</li>
        <li>
          Для восстановления вашего пароля перейдите по ссылке из письма. Ссылка
          будет активна в течение часа
        </li>
      </ul>
      <Button
        type="submit"
        text="Отлично"
        endAdornment={<RiArrowRightCircleFill size={32} />}
        style={{ marginTop: '40px', width: '100%' }}
        onClick={() => setStep(2)}
      />
    </Modal>,
    <Modal defaultOpen={true} key={2} title="Восстановление пароля">
      {formsStore?.passwordRecovery2 && (
        <Form store={formsStore.passwordRecovery2} onSubmit={onSubmitStep2} />
      )}
    </Modal>,
  ]

  return (
    <div className={styles.PasswordRecovery}>
      <Stepper currentStep={step} steps={steps} />
    </div>
  )
}

export default PasswordRecovery
