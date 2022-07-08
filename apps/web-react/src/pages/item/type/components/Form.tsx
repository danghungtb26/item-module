import { useAttributes } from '@hooks/attribute'
import { useItemStatuses } from '@hooks/itemStatus'
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
  const { fetch: fetchAttributes, data: attributes, error: errorAttribute } = useAttributes()
  const {
    fetch: fetchStatus,
    data: statuses,
    error: errorStatus,
  } = useItemStatuses({ init: { page: 1, limit: 100 } })
  useMounted(() => {
    fetchAttributes()
    fetchStatus()
  })

  const childrenAttribute = useMemo(() => {
    return attributes.map(i => <Option key={i.id}>{i.name}</Option>)
  }, [attributes])

  const childrenStatus = useMemo(() => {
    return statuses.map(i => <Option key={i.id}>{i.name}</Option>)
  }, [statuses])

  const handleChangeAttribute = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const handleChangeStatus = (value: string[]) => {
    console.log('🚀 ~ file: Form.tsx ~ line 42 ~ handleChangeStatus ~ value', value)
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
        <Item label="Attribute">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={initData?.attribute?.map(i => i.name) ?? []}
            onChange={handleChangeAttribute}
          >
            {childrenAttribute}
          </Select>
        </Item>
        <Item label="Status">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={initData?.statuses?.map(i => i.name) ?? []}
            onChange={handleChangeStatus}
          >
            {childrenStatus}
          </Select>
        </Item>
      </Form>
    )
  }
  return <div>{renderForm()}</div>
}

export default ItemTypeForm
