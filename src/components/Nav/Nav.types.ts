export interface INavItem {
  id: number
  linkTo: string
  text: string
}

export interface INavProps {
  menuItems: INavItem[]
  activeId: number
}
