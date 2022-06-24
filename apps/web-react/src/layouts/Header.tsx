import { Layout, Dropdown, Menu } from 'antd'
import styled from 'styled-components'

import { MenuFoldOutlined, MenuUnfoldOutlined, UserAddOutlined } from '@ant-design/icons'

const { Header } = Layout

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
  ${'' /* cursor: pointer; */}
`

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`
export default ({ collapsed, handleToggle }: { collapsed: boolean; handleToggle: () => void }) => {
  const Component = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined

  return (
    <Header
      style={{
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        display: 'flex',
        padding: '0px 16px',
      }}
    >
      <TriggerBlock>
        <Component
          className="trigger"
          onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: 'middle',
          }}
        />
      </TriggerBlock>
    </Header>
  )
}
