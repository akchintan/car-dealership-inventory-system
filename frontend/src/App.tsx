import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingOverlay from './components/ui/LoadingOverlay'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import AddCar from './pages/AddCar'
import Cars from './pages/Cars'
import EditCar from './pages/EditCar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useLoading } from './context/LoadingContext'

function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>
    </>
  )
}

function App() {
  const { isLoading, message } = useLoading()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/:id/edit" element={<EditCar />} />
            <Route path="add-car" element={<AddCar />} />
          </Route>
          <Route element={<PublicOnlyRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
      <LoadingOverlay open={isLoading} message={message} />
    </BrowserRouter>
  )
}

export default App
