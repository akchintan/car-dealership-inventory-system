import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddCar from './pages/AddCar'
import Cars from './pages/Cars'
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
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cars" element={<Cars />} />
          <Route path="add-car" element={<AddCar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
