import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm, { type CarFormValues } from '../components/forms/CarForm'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useLoading } from '../context/LoadingContext'
import { createCar, type CreateCarPayload } from '../services/api'
import { getApiErrorMessage } from '../utils/apiError'

const initialFormValues: CarFormValues = {
  brand: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  status: '',
}

const pageStyle = {
  display: 'grid',
  minHeight: 'calc(100vh - 48px)',
  padding: '48px 24px',
  placeItems: 'center',
}

function AddCar() {
  const { token } = useAuth()
  const { success } = useToast()
  const { showLoading, hideLoading } = useLoading()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (formValues: CarFormValues) => {
    setSubmitError('')
    setIsSuccess(false)
    setIsLoading(true)
    showLoading('Creating vehicle...')

    try {
      await createCar<unknown>(
        {
          brand: formValues.brand.trim(),
          model: formValues.model.trim(),
          year: Number(formValues.year),
          price: Number(formValues.price),
          mileage: Number(formValues.mileage),
          status: formValues.status as CreateCarPayload['status'],
        },
        token ?? undefined,
      )

      setIsSuccess(true)
      success('Car added successfully. Redirecting to inventory...')
      window.setTimeout(() => navigate('/cars'), 800)
    } catch (requestError) {
      setSubmitError(getApiErrorMessage(requestError, 'Unable to add the car.'))
    } finally {
      setIsLoading(false)
      hideLoading()
    }
  }

  return (
    <section style={pageStyle} aria-labelledby="add-car-heading">
      <CarForm
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        submitLabel={isLoading ? 'Adding car...' : 'Add car'}
        loading={isLoading}
        disabled={isLoading || isSuccess}
        serverError={submitError}
      >
        <p className="auth-eyebrow">Inventory</p>
        <h1 id="add-car-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.75rem, 4vw, 2.15rem)' }}>
          Add a car
        </h1>
        <p className="auth-intro">Enter the vehicle details to add it to your dealership inventory.</p>
      </CarForm>
    </section>
  )
}

export default AddCar
