import React, { SyntheticEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useStores } from 'hooks/useStores'
import { Modal, Form, INavProps } from 'components'

import styles from './SignIn.module.sass'

const modalNavigation: INavProps = {
  menuItems: [
    { id: 1, linkTo: '/signin', text: 'Вход' },
    { id: 2, linkTo: '/signup', text: 'Регистрация' },
  ],
  activeId: 1,
}

export const SignIn = () => {
  const navigate = useNavigate()
  const { formsStore } = useStores()

  const onSubmitForm = async (event: SyntheticEvent) => {
    const success = await formsStore?.signin?.onSubmit(event)

    if (success) {
      navigate('/')
    }
  }

  return (
    <div className={styles.SignIn}>
      <Modal defaultOpen={true} nav={modalNavigation}>
        {formsStore?.signin && (
          <Form store={formsStore.signin} onSubmit={onSubmitForm} />
        )}
        <div className={styles.modalFooter}>
          <Link to="/password-recovery">Забыли пароль?</Link>
        </div>
      </Modal>
    </div>
  )
}

export default SignIn
