import React from 'react'
import styled from 'styled-components'

const ContainerInner = styled.div`
  background: #fff;
  padding: 24px;
  box-shadow: @shadow-1;
  min-height: ~'calc(100vh - 230px)';
  position: relative;

  @media (max-width: 767px) {
    padding: 12px;
    min-height: ~'calc(100vh - 160px)';
  }
`

const Container = styled.div``

type PageProps = {
  inner?: boolean
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ inner = false, children }) => {
  const Component = inner ? ContainerInner : Container
  return <Component>{children}</Component>
}

export default Page
