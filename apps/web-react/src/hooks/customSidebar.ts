import { useItemTypes } from './itemType'

export const useCustomSidebar: () => { data: Item.TypeInterface[]; loading: boolean } = () => {
  const { data, loading } = useItemTypes({ init: { page: 1, limit: 100 } })
  return {
    data,
    loading,
  }
}
