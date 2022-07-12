import { Menu } from 'antd'
import { DashboardFilled, TrophyFilled } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

const keys = ['/', '/item', '/category', '/item/type', '/item/status', '/item/attribute']

const menu: ItemType[] = [
  { label: 'Dashboard', key: '/' },
  {
    label: 'Item',
    key: '/self',
    children: [
      {
        key: '/item',
        label: 'Self',
      },
      {
        label: 'Type',
        key: '/item/type',
      },
      {
        label: 'Status',
        key: '/item/status',
      },
      {
        label: 'Attribute',
        key: '/item/attribute',
      },
    ],
  },
  {
    label: 'Category',
    key: '/category',
  },
]

export default ({ style, closeDrawer }: any) => {
  const router = useLocation()
  const currentPath = router.pathname
  let selectedKeys: string[] = []
  const navigate = useNavigate()

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
        navigate(key)
        closeDrawer()
      }}
      items={menu}
    />
  )
}
