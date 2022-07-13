import { useItemTypes } from './itemType'
import { useMounted } from './lifecycle'

export const useCustomSidebar: () => { data: Item.TypeInterface[]; loading: boolean } = () => {
  const { data, loading, fetch } = useItemTypes({ init: { page: 1, limit: 100 } })

  useMounted(() => fetch({ page: 1, limit: 100, query: {} }))

  return {
    data,
    loading,
  }
}
