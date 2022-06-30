import FilterItem from '@components/FilterItem'
import { ColDefaultProps, TwoColDefaultProps } from '@themes/styles'
import { Button, Cascader, Col, DatePicker, Form, Input, Row } from 'antd'
import React from 'react'

const { RangePicker } = DatePicker

type FilterProps = {
  onCreate?: () => void
}

const Filter: React.FC<FilterProps> = ({ onCreate }) => {
  return (
    <Form>
      <Row gutter={24}>
        <Col {...ColDefaultProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item>
            <Input onChange={() => {}} placeholder="Search" />
          </Form.Item>
        </Col>

        <Col {...ColDefaultProps} xl={{ span: 4 }} md={{ span: 8 }} id="addressCascader">
          <Form.Item name="address">
            <Cascader
              style={{ width: '100%' }}
              //   options={city}
              placeholder="Please pick an address"
            />
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
              <Button>Reset</Button>
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
