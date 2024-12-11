type MenuItem = {
  path: string,
  name: string,
  text: string,
  icon?: string
}

export type MenuForm = {
  defaultActive: string,
  list: Array<MenuItem>
}

