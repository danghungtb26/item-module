import { useItem } from '@hooks/item'
import { useMounted } from '@hooks/lifecycle'
import React from 'react'
import { useParams } from 'react-router'
import ItemForm from '../components/Form'

type EditItemPageProps = {}

const EditItemPage: React.FC<EditItemPageProps> = () => {
  const param = useParams<{ id: string }>()
  const { data, fetch, loading } = useItem({ id: param.id ?? '' })

  useMounted(() => {
    fetch()
  })

  return <ItemForm initData={data} initLoading={loading} />
}

export default EditItemPage
