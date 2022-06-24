/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-sparse-arrays */
import { Menu } from 'antd'
import { DashboardFilled, TrophyFilled } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

const keys = ['/', '/category']

const menu = [
  <Menu.Item key={keys[0]}>
    <Link to={keys[0]}>
      <DashboardFilled type="dashboard" />
      <span>Dashboard</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[1]}>
    <Link to={keys[1]}>
      <TrophyFilled type="trophy" />
      <span>Category</span>
    </Link>
  </Menu.Item>,
]

export default ({ style, closeDrawer }: any) => {
  const router = useLocation()
  const currentPath = router.pathname
  let selectedKeys: string[] = []

  for (let i = keys.length - 1; i >= 0; i -= 1) {
    if (currentPath.includes(keys[i])) {
      selectedKeys = [keys[i]]
      break
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => {
        closeDrawer()
      }}
    >
      {menu}
    </Menu>
  )
}
