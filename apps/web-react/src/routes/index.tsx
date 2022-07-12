import { MainLayout } from '@layouts'
import CategoryPage from '@pages/category'
import ItemAttributePage from '@pages/item/attribute'
import ItemPage from '@pages/item/self'
import CreateItemPage from '@pages/item/self/create'
import EditItemPage from '@pages/item/self/[id]/edit'
import StatusPage from '@pages/item/status'
import ItemTypePage from '@pages/item/type'

export interface RouteInterface {
  path: string

  element?: React.ReactNode

  layout?: React.ReactNode

  children?: RouteInterface[]
}

const routes: RouteInterface[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '/category',
        element: <CategoryPage />,
      },
      {
        path: '/item',
        children: [
          {
            path: '/self',
            children: [
              {
                path: '',
                element: <ItemPage />,
              },
              {
                path: '/:id',
                element: <ItemPage />,
              },
              {
                path: '/create',
                element: <CreateItemPage />,
              },
              {
                path: '/:id/edit',
                element: <EditItemPage />,
              },
            ],
          },
          {
            path: '/status',
            element: <StatusPage />,
          },
          {
            path: '/type',
            children: [
              {
                path: '',
                element: <ItemTypePage />,
              },
            ],
          },
          {
            path: '/attribute',
            element: <ItemAttributePage />,
          },
        ],
      },
      {
        path: '/type/:type',
        children: [
          {
            path: '/item',
          },
        ],
      },
    ],
  },
]
export default routes
