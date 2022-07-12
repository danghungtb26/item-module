import { useSetLoadingModalForm, useSetOK } from '@components/ModalForm/context'
import { useAttributes } from '@hooks/attribute'
import { useItemStatuses } from '@hooks/itemStatus'
import { useCreateOrUpdateItemType } from '@hooks/itemType'
import { useMounted } from '@hooks/lifecycle'
import { Button, Form, FormInstance, Input, Select } from 'antd'
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react'

const { Option } = Select

const { Item } = Form

export type ItemTypeFormMethod = {
  initData?: Item.TypeInterface
}

export type ItemTypeFormProps = {
  initData?: Item.TypeInterface
  onFinish?: (data: Item.TypeInterface) => void
}

const ItemTypeForm = React.forwardRef<ItemTypeFormMethod, ItemTypeFormProps>(
  ({ initData, onFinish }, ref) => {
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
    const data = useRef<Item.TypeInterface | undefined>()

    useImperativeHandle(ref, () => ({
      get initData() {
        return data.current
      },
      set initData(value) {
        data.current = value

        if (value) {
          setFields(value)
        }
      },
      submit: () => {},
    }))

    const setFields = (value?: Item.TypeInterface) => {
      form.current?.setFields([
        {
          name: 'name',
          value: value?.name,
        },
        {
          name: 'description',
          value: value?.description,
        },
        {
          name: 'attribute',
          value: value?.attribute.map(i => i.id),
        },
        {
          name: 'statuses',
          value: value?.statuses.map(i => i.id),
        },
      ])
    }

    const childrenAttribute = useMemo(() => {
      return attributes.map(i => (
        <Option key={i.id} value={i.id}>
          {i.name}
        </Option>
      ))
    }, [attributes])

    const childrenStatus = useMemo(() => {
      return statuses.map(i => (
        <Option key={i.id} value={i.id}>
          {i.name}
        </Option>
      ))
    }, [statuses])

    // const handleChangeAttribute = (value: string[]) => {
    //   console.log(`selected ${value}`)
    // }

    // const handleChangeStatus = (value: string[]) => {
    //   console.log('🚀 ~ file: Form.tsx ~ line 42 ~ handleChangeStatus ~ value', value)
    // }

    const { loading, fetching } = useCreateOrUpdateItemType(data.current?.id)

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())

    const onSubmit = value => {
      const input: Item.TypeData = {
        ...value,
        attributes: value.attribute.map(i => Number(i)) ?? [],
        statuses: value.statuses.map(i => Number(i)) ?? [],
      }
      fetching({ id: data.current?.id, input }).then(r => {
        if (r) {
          onFinish?.(r)
        }
      })
    }

    const form = useRef<FormInstance>(null)

    const renderForm = () => {
      return (
        <Form ref={form} onFinish={onSubmit}>
          <Item label="Name" name="name">
            <Input />
          </Item>
          <Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Item>
          <Item label="Attribute" name="attribute">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={initData?.attribute?.map(i => i.name) ?? []}
              // onChange={handleChangeAttribute}
            >
              {childrenAttribute}
            </Select>
          </Item>
          <Item label="Status" name="statuses">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={initData?.statuses?.map(i => i.name) ?? []}
              // onChange={handleChangeStatus}
            >
              {childrenStatus}
            </Select>
          </Item>
          <Button title="Save" loading={loading} />
        </Form>
      )
    }
    return <div>{renderForm()}</div>
  }
)
export default ItemTypeForm
