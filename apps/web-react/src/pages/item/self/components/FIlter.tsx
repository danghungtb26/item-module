import FilterItem from '@components/FilterItem'
import { useCategories } from '@hooks/category'
import { useItemStatuses } from '@hooks/itemStatus'
import { useItemTypes } from '@hooks/itemType'
import { useMounted } from '@hooks/lifecycle'
import { ColDefaultProps as c, TwoColDefaultProps } from '@themes/styles'
import { removeUndefined } from '@utils'
import dateTime from '@utils/dateTime'
import moment from 'moment'
import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { createSearchParams, useSearchParams } from 'react-router-dom'

const ColDefaultProps = {
  ...c,

  style: {
    marginBottom: '4px',
  },
}

const { RangePicker } = DatePicker
const { Option } = Select

type FilterProps = {}

const Filter: React.FC<FilterProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { data: types, fetch: fetchTypes } = useItemTypes()
  const { data: categories, fetch: fetchCategories } = useCategories()
  const { data: statuses, fetch: fetchStatuses } = useItemStatuses()

  const form = useRef<FormInstance>(null)

  const [currentType, setCurrentType] = useState<Item.TypeInterface>()

  useMounted(() => {
    fetchTypes({ limit: 1000 })
    fetchCategories({ limit: 1000 })
    fetchStatuses({ limit: 1000 })
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
    return categories.map(i => (
      <Option key={i.id} value={i.id}>
        {i.name}
      </Option>
    ))
  }, [categories])

  const childrenStatus = useMemo(() => {
    return (currentType?.statuses ?? statuses).map(i => (
      <Option key={i.id} value={i.id}>
        {i.name}
      </Option>
    ))
  }, [currentType?.statuses, statuses])

  const [searchParams] = useSearchParams()
  const initValue = useMemo(() => {
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    return {
      search: searchParams.get('search') ?? undefined,
      createTime:
        start && end ? [moment(searchParams.get('start')), moment(searchParams.get('end'))] : [],
      type: searchParams.get('type') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      status: searchParams.get('status') ?? undefined,
    }
  }, [searchParams])

  const onCreate = () => {
    navigate('create')
  }

  const onReset = () => {
    form.current?.resetFields()
  }

  const onSearch = value => {
    const start = value.createTime?.[0]?.format()
    const end = value.createTime?.[1]?.format()
    const query = removeUndefined({
      search: value.search ?? undefined,
      start: start ? dateTime(start).utc().format() : undefined,
      end: end ? dateTime(end).utc().format() : undefined,
      category: value.category ?? undefined,
      type: value.type ?? undefined,
      status: value.status ?? undefined,
    })

    navigate({ pathname: location.pathname, search: `?${createSearchParams(query)}` })
  }

  return (
    <Form ref={form} onFinish={onSearch} initialValues={initValue}>
      <Row gutter={24}>
        <Col {...ColDefaultProps} xl={12} md={12}>
          <Form.Item name="search">
            <Input onChange={() => {}} placeholder="Search" />
          </Form.Item>
        </Col>
        <Col {...ColDefaultProps} xl={12} md={12} sm={24} id="createTimeRangePicker">
          <FilterItem label="Created Time">
            <Form.Item name="createTime">
              <RangePicker allowClear style={{ width: '100%' }} />
            </Form.Item>
          </FilterItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...ColDefaultProps} xl={8} md={8}>
          <Form.Item name="category">
            <Select allowClear style={{ width: '100%' }} placeholder="Please select category">
              {childrenCategory}
            </Select>
          </Form.Item>
        </Col>
        <Col {...ColDefaultProps} xl={8} md={8}>
          <Form.Item name="type">
            <Select
              allowClear
              onChange={onSelectType}
              style={{ width: '100%' }}
              placeholder="Please select type"
            >
              {childrenStyle}
            </Select>
          </Form.Item>
        </Col>
        <Col {...ColDefaultProps} xl={8} md={8}>
          <Form.Item name="status">
            <Select allowClear style={{ width: '100%' }} placeholder="Please select status">
              {childrenStatus}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...TwoColDefaultProps} xl={24} md={{ span: 12 }} sm={12}>
          <Row align="middle" justify="space-between">
            <div>
              <Button type="primary" htmlType="submit" className="margin-right">
                Search
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </div>
            <Row align="middle" justify="end">
              <Button onClick={onCreate} type="ghost">
                Create
              </Button>
            </Row>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter
