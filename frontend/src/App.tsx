import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import AddCar from './pages/AddCar'
import Cars from './pages/Cars'
import EditCar from './pages/EditCar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App() {
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
    </BrowserRouter>
  )
}

export default App
