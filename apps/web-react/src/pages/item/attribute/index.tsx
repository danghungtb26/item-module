import Filter from '@components/Filter'
import ModalForm, { ModalFormMethod } from '@components/ModalForm'
import Page from '@components/Page'
import { useAttributes } from '@hooks/attribute'
import { useFetchPage } from '@hooks/lifecycle'
import { Table, TableProps } from 'antd'
import React, { useRef } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ItemAttributeForm, { ItemAttributeFormMethod } from './components/Form'

type ItemAttributePageProps = {}

const ItemAttributePage: React.FC<ItemAttributePageProps> = () => {
  const [searchParams] = useSearchParams()
  const { data, loading, fetch, page } = useAttributes({
    init: {
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit') ?? 10),
    },
  })

  const location = useLocation()

  const refetch = useFetchPage(fetch)

  const columns = useRef<TableProps<Item.AttributeInterface>['columns']>([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text: string, record) => (
        <Link to={`${location.pathname}/${record.id}`}>{record.name}</Link>
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
      title: 'Required',
      dataIndex: 'required',
      key: 'required',
    },
  ]).current

  const modal = useRef<ModalFormMethod>(null)
  const form = useRef<ItemAttributeFormMethod>(null)

  const showModal = () => {
    if (modal.current) {
      modal.current.visible = true
    }
  }

  const onPressCreate = () => {
    showModal()
  }
  const onFinish = () => {
    refetch()
  }

  const navigate = useNavigate()

  const onChange: TableProps<Item.AttributeInterface>['onChange'] = ({ current }) => {
    navigate(`${location.pathname}?page=${current}`)
  }

  return (
    <Page inner>
      <div className="container">
        <Filter onCreate={onPressCreate} />
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
          onChange={onChange}
        />
      </div>
      <ModalForm ref={modal} forceRender>
        <ItemAttributeForm ref={form} onFinish={onFinish} />
      </ModalForm>
    </Page>
  )
}

export default ItemAttributePage
