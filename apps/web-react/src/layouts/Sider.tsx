import React, { useEffect, useRef } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const { Sider: SiderAnt } = Layout

const FixedSider = styled(SiderAnt)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

  @media (max-width: 575.98px) {
    display: none;
  }
`

const Sider: React.FC<{
  children?: React.ReactNode
  collapsed: boolean
  setCollapsed: (s: boolean) => void
}> = ({ collapsed, setCollapsed, children }) => {
  const firstMounted = useRef(false)

  useEffect(() => {
    firstMounted.current = true
  }, [])

  return (
    <FixedSider trigger={null} width={256} collapsible collapsed={collapsed}>
      {children}
    </FixedSider>
  )
}

export default Sider
