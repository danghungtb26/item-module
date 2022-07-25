import { useCategories } from '@hooks/category'
import { useCreateOrUpdateItem } from '@hooks/item'
import { useItemTypes } from '@hooks/itemType'
import { useMounted } from '@hooks/lifecycle'
import { defaultFormItemLayout } from '@themes/styles'
import { Button, Form, FormInstance, Input, notification, Select, TreeSelect } from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import _ from 'lodash'
import { ItemAttribute } from './Attribute'

const { Option } = Select

type ItemFormProps = {
  initData?: Item.Interface
  initLoading?: boolean
}
const ItemForm: React.FC<ItemFormProps> = ({ initData, initLoading = false }) => {
  const { data: types, fetch: fetchTypes } = useItemTypes()
  const { data: categories, fetch: fetchCategories } = useCategories()
  const form = useRef<FormInstance>(null)

  const [currentType, setCurrentType] = useState<Item.TypeInterface>()

  useMounted(() => {
    fetchTypes({ limit: 1000 })
    fetchCategories({ limit: 1000 })
  })

  const onSelectType = i => {
    const index = types.findIndex(o => o.id === i)
    if (index >= 0) setCurrentType(types[index])
    form.current?.resetFields(['status'])
  }

  const childrenStyle = useMemo(() => {
    return types.map(i => (
      <Option key={i.id} value={i.id}>
        {i.name}
      </Option>
    ))
  }, [types])

  const childrenCategory = useMemo(() => {
    return categories.map(i => ({
      id: Number(i.id) ?? 0,
      title: i.name,
      value: Number(i.id) ?? 0,
      pId: Number(i.parentId),
    }))
  }, [categories])

  const childrenStatus = useMemo(() => {
    return currentType?.statuses.map(i => (
      <Option key={i.id} value={i.id}>
        {i.name}
      </Option>
    ))
  }, [currentType?.statuses])

  const { loading, fetching } = useCreateOrUpdateItem(initData?.id)

  const navigate = useNavigate()

  const onSubmit = value => {
    const input: Item.Interface = {
      ...value,
    }
    fetching({ id: initData?.id, input }).then(r => {
      if (r) {
        navigate('/item')
        notification.success({
          message: `${initData?.id ? 'Edit' : 'Create'} item ${initData?.id} successfully`,
        })
        return
      }

      notification.error({
        message: 'Something wrong',
      })
    })
  }

  const attributes = useMemo(() => {
    return (
      currentType?.attribute.filter(
        i =>
          ![
            'name',
            'description',
            'slug',
            'title',
            'subtitle',
            'image',
            'images',
            'price',
          ].includes(i.name)
      ) ?? []
    )
  }, [currentType?.attribute])

  const renderMoreAttributes = useMemo(() => {
    return (
      <>
        {attributes.map(i => {
          return (
            <Form.Item
              name={i.name}
              required={i.required}
              label={_.capitalize(i.name)}
              hasFeedback
              {...defaultFormItemLayout}
            >
              <ItemAttribute name={i.name} required={i.required} type={i.valueType} />
            </Form.Item>
          )
        })}
      </>
    )
  }, [attributes])

  const renderForm = () => {
    return (
      <Form onFinish={onSubmit} ref={form} initialValues={initData}>
        <Form.Item name="name" label="Name" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description" hasFeedback {...defaultFormItemLayout}>
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
        <Form.Item name="categoryId" label="Category" hasFeedback {...defaultFormItemLayout}>
          <TreeSelect
            placeholder="Please select"
            allowClear
            treeDataSimpleMode
            showSearch
            treeData={childrenCategory}
          />
        </Form.Item>
        <Form.Item name="typeId" label="Type" hasFeedback {...defaultFormItemLayout}>
          <Select placeholder="Please select" onSelect={onSelectType}>
            {childrenStyle}
          </Select>
        </Form.Item>
        <Form.Item name="statusId" label="Status" hasFeedback {...defaultFormItemLayout}>
          <Select placeholder="Please select">{childrenStatus}</Select>
        </Form.Item>
        <Form.Item name="slug" label="Slug" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Slug" />
        </Form.Item>
        <Form.Item name="title" label="Title" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="subtitle" label="Subtitle" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Subtitle" />
        </Form.Item>
        {renderMoreAttributes}
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return <div>{renderForm()}</div>
}

export default ItemForm
