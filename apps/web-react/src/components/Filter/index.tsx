import FilterItem from '@components/FilterItem'
import { ColDefaultProps, TwoColDefaultProps } from '@themes/styles'
import { removeUndefined } from '@utils'
import moment from 'moment'
import { Button, Col, DatePicker, Form, FormInstance, Input, Row } from 'antd'
import React, { useMemo, useRef } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const { RangePicker } = DatePicker

type FilterProps = {
  onCreate?: () => void
}

const Filter: React.FC<FilterProps> = ({ onCreate }) => {
  const form = useRef<FormInstance>(null)
  const [searchParams] = useSearchParams()
  const initValue = useMemo(() => {
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    return {
      search: searchParams.get('search') ?? undefined,
      createTime:
        start && end ? [moment(searchParams.get('start')), moment(searchParams.get('end'))] : [],
    }
  }, [searchParams])

  const navigate = useNavigate()
  const location = useLocation()

  const onReset = () => {
    form.current?.resetFields()
  }

  const onSearch = value => {
    const query = removeUndefined({
      search: value.search,
      start: value.createTime?.[0],
      end: value.createTime?.[1],
    })

    navigate({ pathname: location.pathname, search: `?${createSearchParams(query)}` })
  }

  return (
    <Form ref={form} initialValues={initValue} onFinish={onSearch}>
      <Row gutter={24}>
        <Col {...ColDefaultProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name="search">
            <Input onChange={() => {}} placeholder="Search" />
          </Form.Item>
        </Col>

        <Col
          {...ColDefaultProps}
          xl={{ span: 6 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          id="createTimeRangePicker"
        >
          <FilterItem label="Created Time">
            <Form.Item name="createTime">
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </FilterItem>
        </Col>
        <Col {...TwoColDefaultProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row align="middle" justify="space-between">
            <div>
              <Button type="primary" htmlType="submit" className="margin-right">
                Search
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </div>
            <Button onClick={onCreate} type="ghost">
              Create
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter
