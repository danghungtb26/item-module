import React, { useEffect, useRef, useState } from 'react'
import { Button, Space, Table, TableProps } from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import Filter from './components/Filter'

const CategoryPage: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {}, [param.id])

  const columns = useRef<TableProps<any>['columns']>([
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
      render: (text: string, record) => (
        <Link to={`${location.pathname}/${record.getId()}/rule-file`}>{text}</Link>
      ),
    },
    // {
    //   title: 'Author',
    //   dataIndex: 'author',
    //   key: 'author',
    // },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
    },
    {
      title: 'Release At',
      dataIndex: 'released_at',
      key: 'released_at',
      render: (_, record) => record.getReleaseDate(),
    },
    {
      title: 'Rollback At',
      dataIndex: 'rollback_at',
      key: 'rollback_at',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate(`${location.pathname}/${record.getId()}/rule-file`)}
            type="primary"
          >
            View
          </Button>
        </Space>
      ),
    },
  ])

  return (
    <Page inner>
      <div className="container">
        <Filter />
        <Table
          scroll={{ x: 1200 }}
          rowKey={i => i.name}
          columns={columns.current}
          dataSource={data}
          loading={loading}
        />
      </div>
    </Page>
  )
}

export default CategoryPage
