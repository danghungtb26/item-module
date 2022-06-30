import Page from '@components/Page'
import { useAttributes } from '@hooks/attribute'
import { useItemTypes } from '@hooks/itemType'
import { Button, Space, Table, TableProps } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './index.less'

type ItemTypePageProps = {}

const ItemTypePage: React.FC<ItemTypePageProps> = () => {
  const { data, loading, fetch, page } = useItemTypes({ init: { page: 1, limit: 10 } })

  useEffect(() => {
    fetch()
  }, [fetch])

  const param = useParams()
  const navigate = useNavigate()
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
        <Link to={`${location.pathname}/${record.id}/edit`}>{text}</Link>
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
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate(`${location.pathname}/${record.id}/rule-file`)}
            type="primary"
          >
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
          className={styles.table}
          scroll={{ x: 1200 }}
          rowKey={i => i.name}
        />
      </div>
    </Page>
  )
}

export default ItemTypePage
