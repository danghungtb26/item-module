import { Layout } from 'antd'
import styled, { css } from 'styled-components'

import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router'
import Sider from './Sider'
import Menu from './Menu'
import Header from './Header'
import Drawer from './Drawer'

const Main = styled(({ collapsed: _, ...props }) => <Layout {...props} />)`
  transition: 0.2s all;
  margin-left: 256px;
  ${({ collapsed }: { collapsed: boolean }) =>
    collapsed &&
    css`
      margin-left: 80px;
    `};

  @media (max-width: 575.98px) {
    margin-left: 0;
  }
`

const { Content } = Layout

const ContentStyle = styled(Content)`
  padding: 24px;
  min-height: ~'calc(100% - 72px)';
`

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // const [collapsed, setCollapsed] = useState<boolean>(false)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [cookies, setCookie] = useCookies(['collapsed-sider'])

  const collapsed = !!cookies['collapsed-sider']

  const setCollapsed = (s: any) => {
    setCookie('collapsed-sider', s)
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={collapsed} setCollapsed={collapsed => {}}>
        <Menu style={{}} closeDrawer={() => {}} />
      </Sider>

      <Main collapsed={collapsed}>
        <Header
          collapsed={collapsed}
          handleToggle={() => {
            if (window.innerWidth >= 576) {
              setCollapsed(collapsed ? '' : '1')
              return
            }

            setDrawerVisible(s => !s)
          }}
        />
        <ContentStyle>
          {children}
          <Outlet />
        </ContentStyle>
      </Main>

      <Drawer
        drawerVisible={drawerVisible}
        closeDrawer={() => {
          setDrawerVisible(false)
        }}
      >
        <Menu
          style={{ minHeight: '100vh', width: '50vh' }}
          closeDrawer={() => {
            setDrawerVisible(false)
          }}
        />
      </Drawer>
    </Layout>
  )
}

export default DashboardLayout
