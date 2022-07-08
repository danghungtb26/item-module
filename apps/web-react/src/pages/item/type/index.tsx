import ModalForm, { ModalFormMethod } from '@components/ModalForm'
import Page from '@components/Page'
import { useItemTypes } from '@hooks/itemType'
import { useMounted } from '@hooks/lifecycle'
import { Button, Space, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ItemTypeForm, { ItemTypeFormMethod } from './components/Form'
import styles from './index.less'

type ItemTypePageProps = {}

const ItemTypePage: React.FC<ItemTypePageProps> = () => {
  const param = useParams()
  const navigate = useNavigate()
  const { data, loading, fetch, page } = useItemTypes({ init: { page: 1, limit: 10 } })

  useMounted(fetch)

  const location = useLocation()

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
      dataIndex: 'version',
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

  const onFinish = () => {}

  return (
    <Page inner>
      <div className="container">
        <Table
          dataSource={data}
          bordered
          loading={loading}
          columns={columns}
          className={styles.table}
          scroll={{ x: 1200 }}
          rowKey={i => i.name}
        />
      </div>
      <ModalForm ref={modal} forceRender>
        <ItemTypeForm ref={form} onFinish={onFinish} />
      </ModalForm>
    </Page>
  )
}

export default ItemTypePage
