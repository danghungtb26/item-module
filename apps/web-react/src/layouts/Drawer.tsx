import React from 'react'
import { Drawer as AntDrawer } from 'antd'
import styled from 'styled-components'

const StyledDrawer = styled(AntDrawer)`
  .ant-drawer-wrapper-body {
    overflow: hidden !important;
  }
`
const Drawer: React.FC<{
  drawerVisible: boolean
  closeDrawer: () => void
  children?: React.ReactNode
}> = ({ drawerVisible, closeDrawer, children }) => (
  <StyledDrawer
    placement="left"
    closable={false}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
      margin: 0,
      padding: 0,
    }}
  >
    {children}
  </StyledDrawer>
)

export default Drawer
