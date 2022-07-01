import React, { useRef } from 'react'
import { Button, Space, Table, TableProps } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Page from '@components/Page'
import { useCategories } from '@hooks/category'
import { useMounted } from '@hooks/lifecycle'
import Filter from './components/Filter'
import ModalForm, { ModalFormMethod } from './components/Modal'

const CategoryPage: React.FC = () => {
  const { loading, data, fetch } = useCategories()

  useMounted(fetch)

  const navigate = useNavigate()
  const location = useLocation()

  const modal = useRef<ModalFormMethod>(null)

  const columns = useRef<TableProps<CategoryInterface>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '60px',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record) => (
        <Link to={`${location.pathname}/${record.id}/edit`}>{text}</Link>
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
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`${location.pathname}/${record.id}/edit`)} type="ghost">
            Edit
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
        <ModalForm ref={modal} />
      </div>
    </Page>
  )
}

export default CategoryPage
