import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '@layouts'
import CategoryPage from '@pages/category'
import StatusPage from '@pages/status'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Route>
    </Routes>
  )
}

export default App
