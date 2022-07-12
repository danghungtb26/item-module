import ModalForm, { ModalFormMethod } from '@components/ModalForm'
import Page from '@components/Page'
import { useItemTypes } from '@hooks/itemType'
import { useFetchPage } from '@hooks/lifecycle'
import { Button, Space, Table, TableProps, Tag } from 'antd'
import React, { useRef } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ItemTypeForm, { ItemTypeFormMethod } from './components/Form'

type ItemTypePageProps = {}

const ItemTypePage: React.FC<ItemTypePageProps> = () => {
  const [searchParams] = useSearchParams()

  const { data, loading, fetch, page } = useItemTypes({
    init: {
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit') ?? 10),
    },
  })

  useFetchPage(fetch)

  const location = useLocation()
  const navigate = useNavigate()

  const columns = useRef<TableProps<Item.TypeInterface>['columns']>([
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
      width: '10%',
      render: (text: string, record) => (
        <Link to={`${location.pathname}/${record.id}`}>{text}</Link>
      ),
    },
    {
      width: '10%',
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
    },
    {
      width: '10%',
      title: 'Attach to sidebar',
      dataIndex: 'attach_to_sidebar',
      key: 'attach_to_sidebar',
    },
    {
      width: '25%',
      title: 'Attributes',
      dataIndex: 'includes',
      key: 'includes',
      render: (_, record) => {
        if (!Array.isArray(record.attribute)) return null
        return (
          <>
            {record.attribute.map(i => {
              return <Tag key={i.name}>{i.name}</Tag>
            })}
          </>
        )
      },
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
  const form = useRef<ItemTypeFormMethod>(null)

  const showModal = () => {
    if (modal.current) {
      modal.current.visible = true
    }
  }

  const hideModal = () => {
    if (modal.current) {
      modal.current.visible = false
    }
  }

  const setModalData = (value?: Item.TypeInterface) => {
    if (form.current) {
      form.current.initData = value
    }
  }

  const onPressCreate = () => {
    showModal()
  }

  const onPressEdit = (value: Item.TypeInterface) => {
    showModal()
    setModalData(value)
  }

  const onFinish = () => {
    hideModal()
    fetch({
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit') ?? 10),
    })
  }

  const onChange: TableProps<Item.TypeInterface>['onChange'] = ({ current }) => {
    navigate(`${location.pathname}?page=${current}`)
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
          rowKey={i => i.id}
          pagination={{
            total: page.count,
            pageSize: Number(searchParams.get('limit') ?? 10),
            current: page.current,
          }}
          onChange={onChange}
        />
      </div>
      <ModalForm ref={modal} forceRender>
        <ItemTypeForm ref={form} onFinish={onFinish} />
      </ModalForm>
    </Page>
  )
}

export default ItemTypePage
