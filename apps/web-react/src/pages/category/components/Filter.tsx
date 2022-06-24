import FilterItem from '@components/FilterItem'
import { Button, Cascader, Col, DatePicker, Form, Row } from 'antd'
import Search from 'antd/lib/input/Search'
import React from 'react'

const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

type FilterProps = {}

const Filter: React.FC<FilterProps> = () => {
  return (
    <Form>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item>
            <Search onSearch={() => {}} placeholder="Search" />
          </Form.Item>
        </Col>

        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} id="addressCascader">
          <Form.Item name="address">
            <Cascader
              style={{ width: '100%' }}
              //   options={city}
              placeholder="Please pick an address"
            />
          </Form.Item>
        </Col>
        <Col
          {...ColProps}
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
        <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row align="middle" justify="space-between">
            <div>
              <Button type="primary" htmlType="submit" className="margin-right">
                Search
              </Button>
              <Button>Reset</Button>
            </div>
            <Button type="ghost">Create</Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter
