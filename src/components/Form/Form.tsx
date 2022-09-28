import React, { FC } from 'react'
import { useObserver } from 'mobx-react-lite'
import { RiArrowRightCircleFill } from 'react-icons/ri'

import { InputType } from 'stores/forms/form.types'
import { Input, Button } from 'components'

import { IFormProps } from './Form.types'
import styles from './Form.module.sass'

export const Form: FC<IFormProps> = React.forwardRef((props, ref: any) => {
  const { store, onSubmit } = props
  const [fields] = useObserver(() => [store.fields])

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      autoComplete="off"
      ref={ref}
    >
      {Object.values(fields as InputType[]).map((field: InputType) => (
        <Input key={field.name} field={field} store={store} />
      ))}
      <Button
        type="submit"
        text={store.submitButtonText}
        endAdornment={<RiArrowRightCircleFill size={32} />}
        style={{ marginTop: '40px' }}
      />
    </form>
  )
})

export default Form
