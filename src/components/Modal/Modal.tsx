import React, { FC, useState } from 'react'

import { RiCloseFill } from 'react-icons/ri'

import { Nav } from 'components'

import { IModalProps } from './Modal.types'

import styles from './Modal.module.sass'

export const Modal: FC<IModalProps> = ({
  defaultOpen,
  nav,
  title,
  caption,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? true)

  return (
    <>
      {open && (
        <div className={`${styles.modal} ${open && styles.modal__active}`}>
          <div className={styles.closeButton} onClick={() => setOpen(false)}>
            <RiCloseFill size={22} />
          </div>
          <div>{nav && <Nav {...nav} />}</div>
          {!!title && <h1 className={styles.title}>{title}</h1>}
          {!!caption && <p className={styles.caption}>{caption}</p>}
          <div>{children}</div>
        </div>
      )}
    </>
  )
}

export default Modal
