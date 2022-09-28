import React, { useState, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowRightCircleFill } from 'react-icons/ri'

import { useStores } from 'hooks/useStores'
import { Modal, Form, INavProps, Stepper, Button } from 'components'
import { RESEND_CODE_COOLDOWN } from 'constants/signup'

import styles from './SignUp.module.sass'

const modalNavigation: INavProps = {
  menuItems: [
    { id: 1, linkTo: '/signin', text: 'Вход' },
    { id: 2, linkTo: '/signup', text: 'Регистрация' },
  ],
  activeId: 2,
}

export const SignUp = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(0)
  const [timeToResend, setTimeToResend] = useState<number>()
  const [sendTimer, setSendTimer] = useState<any>(null)
  const { formsStore } = useStores()

  const nextStep = () => {
    setStep(step + 1 < steps.length - 1 ? step + 1 : steps.length - 1)
  }

  const onSubmitStep1 = async (event: SyntheticEvent) => {
    const success = await sendCode(event)
    if (success) {
      nextStep()
    }
  }

  const onSubmitStep2 = async (event: SyntheticEvent) => {
    const success = await formsStore?.signup2?.onSubmit(event)
    if (success) {
      nextStep()
    }
  }

  const onSubmitStep3 = async (event: SyntheticEvent) => {
    const success = await formsStore?.signup3?.onSubmit(event)
    console.log(success)
    if (success) {
      nextStep()
    }
    if (!success) {
      navigate('/signin')
    }
  }

  const sendCode = async (event?: SyntheticEvent) => {
    const result = await formsStore?.signup1?.onSubmit(event)
    const nextSendTimestamp = +new Date() / 1000 + RESEND_CODE_COOLDOWN
    if (sendTimer) {
      clearInterval(sendTimer)
    }
    setTimeToResend(RESEND_CODE_COOLDOWN)
    setSendTimer(
      setInterval(() => {
        setTimeToResend(Math.ceil(nextSendTimestamp - +new Date() / 1000))
      }, 1000)
    )

    return result
  }

  const steps = [
    <Modal defaultOpen={true} nav={modalNavigation} key={0}>
      {formsStore?.signup1 && (
        <Form store={formsStore.signup1} onSubmit={onSubmitStep1} />
      )}
    </Modal>,
    <Modal defaultOpen={true} nav={modalNavigation} key={1}>
      {formsStore?.signup2 && (
        <Form store={formsStore.signup2} onSubmit={onSubmitStep2} />
      )}
      {!!timeToResend && timeToResend >= 0 ? (
        <div className={styles.resendCode}>
          Отправить код повторно или изменить номер можно будет через{' '}
          {timeToResend} секунд
        </div>
      ) : (
        <div className={styles.expiredCodeActions}>
          <span onClick={() => setStep(0)}>Изменить номер</span>
          <span onClick={() => sendCode()}>Отправить код повторно</span>
        </div>
      )}
    </Modal>,
    <Modal defaultOpen={true} nav={modalNavigation} key={2}>
      {formsStore?.signup3 && (
        <Form store={formsStore.signup3} onSubmit={onSubmitStep3} />
      )}
    </Modal>,
    <Modal defaultOpen={true} key={3}>
      <h1 className={styles.signupSuccessTitle}>
        Вы создали личный кабинет на mooon.by
      </h1>
      <hr />
      <ul className={styles.signupSuccessInfo}>
        <li>Мы отправили вам email на указанную почту</li>
        <li>Для подтверждения активации перейдите по ссылке из письма</li>
        <li>
          Неподтвуржденные в течение 24 часов профили удаляются. После этого
          потребуется повторная регистрация
        </li>
      </ul>
      <Link to="/signin">
        <Button
          type="submit"
          text="Отлично"
          endAdornment={<RiArrowRightCircleFill size={32} />}
          style={{ marginTop: '40px', width: '100%' }}
        />
      </Link>
    </Modal>,
  ]

  return (
    <div className={styles.SignUp}>
      <Stepper currentStep={step} steps={steps} />
    </div>
  )
}

export default SignUp
