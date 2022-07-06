import { useAttributes } from '@hooks/attribute'
import { useMounted } from '@hooks/lifecycle'
import { Form, Input, Select } from 'antd'
import React, { useEffect, useMemo } from 'react'

const { Option } = Select

const { Item } = Form

type ItemTypeFormProps = {
  initData?: Item.TypeInterface
  // initLoading?: boolean
  // initError?: boolean
}

const ItemTypeForm: React.FC<ItemTypeFormProps> = ({ initData }) => {
  const { fetch: fetchAttributes, data: attributes } = useAttributes()

  useMounted(() => {
    fetchAttributes()
  })

  const children = useMemo(() => {
    return attributes.map(i => <Option key={i.name}>{i.name}</Option>)
  }, [attributes])

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const renderForm = () => {
    return (
      <Form>
        <Item label="Name">
          <Input />
        </Item>
        <Item label="Description">
          <Input.TextArea rows={4} />
        </Item>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={initData?.attributes?.map(i => i.name) ?? []}
          onChange={handleChange}
        >
          {children}
        </Select>
      </Form>
    )
  }
  return <div>{renderForm()}</div>
}

export default ItemTypeForm
