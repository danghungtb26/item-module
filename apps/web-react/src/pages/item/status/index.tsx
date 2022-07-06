import Page from '@components/Page'
import { useItemTypes } from '@hooks/itemType'
import { Button, Space, Table, TableProps } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import ModalForm, { ModalFormMethod } from './components/Modal'

type ItemStatusPageProps = {}

const ItemStatusPage: React.FC<ItemStatusPageProps> = () => {
  const [searchParams] = useSearchParams()
  const { data, loading, fetch, page } = useItemTypes({
    init: {
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit') ?? 10),
    },
  })

  const location = useLocation()

  useEffect(() => {
    fetch()
  }, [fetch])

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
        <Link to={`${location.pathname}/${record.id}`}>{text}</Link>
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
          <Button onClick={() => onPressEdit(record)} type="primary">
            View
          </Button>
        </Space>
      ),
    },
  ]).current

  const modal = useRef<ModalFormMethod>(null)

  const showModal = () => {
    if (modal.current) {
      modal.current.visible = true
    }
  }

  const setModalData = (value: Item.StatusInterface) => {
    if (modal.current) {
      modal.current.initData = value
    }
  }

  const onPressCreate = () => {
    showModal()
  }

  const onPressEdit = (value: Item.StatusInterface) => {
    setModalData(value)
    showModal()
  }

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
          pagination={{
            total: page.count,
            pageSize: Number(searchParams.get('limit') ?? 10),
            current: page.current,
          }}
        />
      </div>
      <ModalForm ref={modal} />
    </Page>
  )
}

export default ItemStatusPage
