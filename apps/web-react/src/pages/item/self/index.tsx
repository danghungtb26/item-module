import Page from '@components/Page'
import { useItems } from '@hooks/item'
import { Button, Space, Table, TableProps } from 'antd'
import React, { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Filter from './components/FIlter'

type ItemPageProps = {}

const ItemPage: React.FC<ItemPageProps> = () => {
  const { data, loading, fetch } = useItems()
  const [searchParams] = useSearchParams()
  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const page = useMemo(() => {
    return Number(searchParams.get('page') ?? 1)
  }, [searchParams])

  const limit = useMemo(() => Number(searchParams.get('limit') ?? 10), [searchParams])

  useEffect(() => {
    fetch({
      page,

      limit,
      query: {
        type: param.type,
      },
    })
  }, [limit, page, param.type])

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
        <Filter />
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
