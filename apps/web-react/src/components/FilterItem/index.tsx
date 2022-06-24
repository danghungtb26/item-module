import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const WrapLabel = styled.div`
  width: auto;
  line-height: 28px;
  margin-right: 12px;
  justify-content: space-between;
  display: flex;
  overflow: hidden;
`

const Item = styled.span`
  flex: 1;
`
type FilterItemProps = {
  label: string
  children?: React.ReactNode
}

const FilterItem: React.FC<FilterItemProps> = ({ label, children }) => {
  const labelArray = label.split('')
  return (
    <Container>
      {labelArray.length > 0 && (
        <WrapLabel>
          {labelArray.map((i, index) => (
            <span key={index} className="labelText">
              {i}
            </span>
          ))}
        </WrapLabel>
      )}
      <Item>{children}</Item>
    </Container>
  )
}

export default FilterItem
