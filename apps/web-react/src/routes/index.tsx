import { MainLayout } from '@layouts'
import CategoryPage from '@pages/category'
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
        ],
      },
    ],
  },
]

console.log('xin chao', window.location)

export default routes
