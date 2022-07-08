import React, { useRef } from 'react'
import { Button, Space, Table, TableProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import Page from '@components/Page'
import { useCategories } from '@hooks/category'
import { useMounted } from '@hooks/lifecycle'
import ModalForm, { ModalFormMethod } from '@components/ModalForm'
import Filter from './components/Filter'
import CategoryForm, { CategoryFormMethod } from './components/Form'
// import ModalForm, { ModalFormMethod } from './components/Modal'

const CategoryPage: React.FC = () => {
  const { loading, data, fetch } = useCategories()

  useMounted(fetch)

  const location = useLocation()

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
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parentId',
      render: (_, record) => {
        if (record.parentId) {
          return <Link to={`${location.pathname}/${record.parentId}`}>{record.parentId}</Link>
        }

        return null
      },
    },
    {
      title: 'Sub count',
      dataIndex: 'subChildrenCount',
      key: 'subChildrenCount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onPressEdit(record)} type="ghost">
            Edit
          </Button>
        </Space>
      ),
    },
  ])

  const modal = useRef<ModalFormMethod>(null)
  const form = useRef<CategoryFormMethod>(null)

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

  const setModalData = (value: CategoryInterface) => {
    if (form.current) {
      form.current.initData = value
    }
  }

  const onPressCreate = () => {
    showModal()
  }

  const onPressEdit = (value: CategoryInterface) => {
    showModal()
    setModalData(value)
  }

  const onFinishedForm = (value: CategoryInterface) => {
    console.log('🚀 ~ file: index.tsx ~ line 104 ~ onFinishedForm ~ value', value)
    hideModal()
    fetch()
  }

  return (
    <Page inner>
      <div className="container">
        <Filter onCreate={onPressCreate} />
        <Table
          scroll={{ x: 1200 }}
          rowKey={i => i.name}
          columns={columns.current}
          dataSource={data}
          loading={loading}
        />
        <ModalForm ref={modal} forceRender>
          <CategoryForm ref={form} onFinished={onFinishedForm} />
        </ModalForm>
      </div>
    </Page>
  )
}

export default CategoryPage
