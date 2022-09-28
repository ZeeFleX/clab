import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { INavItem, INavProps } from './Nav.types'
import styles from './Nav.module.sass'

export const Nav: FC<INavProps> = ({ menuItems, activeId }) => {
  return (
    <ul className={styles.NavHorizontal}>
      {menuItems.map((menuItem: INavItem) => (
        <li
          key={menuItem.id}
          className={`${activeId === menuItem.id ? styles.activeItem : ''}`}
        >
          <Link to={menuItem.linkTo}>{menuItem.text}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Nav
