import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingOverlay from './components/ui/LoadingOverlay'
import PageLoader from './components/ui/PageLoader'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import { useLoading } from './context/LoadingContext'

const Home = lazy(() => import('./pages/Home'))
const Cars = lazy(() => import('./pages/Cars'))
const AddCar = lazy(() => import('./pages/AddCar'))
const EditCar = lazy(() => import('./pages/EditCar'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <div className="app-container">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
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
