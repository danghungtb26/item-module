import './App.less'
import './App.css'
// import './themes/index.less'
import { Route, Routes } from 'react-router-dom'
import routes, { RouteInterface } from '@routes'
import { useEffect } from 'react'

const appendRoute = (prePath: string, children: RouteInterface[]) => {
  return children.map(i => (
    <Route key={prePath + i.path} path={prePath + i.path} element={i.element}>
      {appendRoute(prePath + i.path, i.children ?? [])}
    </Route>
  ))
}

const RoutesElement = appendRoute('', routes)
function App() {
  useEffect(() => {}, [])
  return <Routes>{RoutesElement}</Routes>
}

export default App
