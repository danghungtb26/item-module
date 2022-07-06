import Page from '@components/Page'
import { useItems } from '@hooks/item'
import { useMounted } from '@hooks/lifecycle'
import { Button, Space, Table, TableProps } from 'antd'
import React, { useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

type ItemPageProps = {}

const ItemPage: React.FC<ItemPageProps> = () => {
  const { data, loading, fetch } = useItems()

  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useMounted(() => {
    fetch({
      query: {
        type: param.type,
      },
    })
  })

  const columns = useRef<TableProps<Item.StatusInterface>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '60px',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'version',
      key: 'name',
      width: '10%',
      render: (text: string, record) => (
        <Link to={`${location.pathname}/${record.id}/edit`}>{text}</Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
    },
    {
      width: '25%',
      title: 'Attributes',
      dataIndex: 'includes',
      key: 'includes',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`${location.pathname}/${record.id}/edit`)} type="primary">
            View
          </Button>
        </Space>
      ),
    },
  ]).current
  return (
    <Page inner>
      <div className="container">
        <Table
          dataSource={data}
          bordered
          loading={loading}
          columns={columns}
          scroll={{ x: 1200 }}
          rowKey={i => i.name}
        />
      </div>
    </Page>
  )
}

export default ItemPage
