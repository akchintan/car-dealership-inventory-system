import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm, { type CarFormValues } from '../components/forms/CarForm'
import { useToast } from '../context/ToastContext'
import { useLoading } from '../context/LoadingContext'
import {
  getCarById,
  updateCar,
  type CreateCarPayload,
} from '../services/api'
import { getApiErrorMessage } from '../utils/apiError'

interface Car extends CreateCarPayload {
  _id: string
}

interface CarResponse {
  car: Car
}

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

function EditCar() {
  const { id } = useParams()
  const { success } = useToast()
  const { showLoading, hideLoading } = useLoading()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<CarFormValues>(initialFormValues)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadCar = async () => {
      if (!id) {
        if (isMounted) {
          setLoadError('Unable to find this car.')
          setIsLoading(false)
        }
        return
      }

      try {
        const { car } = await getCarById<CarResponse>(id)

        if (isMounted) {
          setInitialValues({
            brand: car.brand,
            model: car.model,
            year: String(car.year),
            price: String(car.price),
            mileage: String(car.mileage),
            status: car.status,
          })
        }
      } catch (requestError) {
        if (isMounted) {
          setLoadError(getApiErrorMessage(requestError, 'Unable to load this car.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCar()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (formValues: CarFormValues) => {
    setSubmitError('')
    setIsSuccess(false)

    if (!id) {
      setSubmitError('Unable to find this car.')
      return
    }

    setIsSubmitting(true)
    showLoading('Saving vehicle...')

    try {
      await updateCar<unknown>(
        id,
        {
          brand: formValues.brand.trim(),
          model: formValues.model.trim(),
          year: Number(formValues.year),
          price: Number(formValues.price),
          mileage: Number(formValues.mileage),
          status: formValues.status as CreateCarPayload['status'],
        },
      )

      setIsSuccess(true)
      success('Car updated successfully. Redirecting to inventory...')
      window.setTimeout(() => navigate('/cars'), 800)
    } catch (requestError) {
      setSubmitError(getApiErrorMessage(requestError, 'Unable to update the car.'))
    } finally {
      setIsSubmitting(false)
      hideLoading()
    }
  }

  if (isLoading) {
    return (
      <section style={pageStyle} aria-live="polite">
        <div style={{ width: 'min(100%, 680px)', padding: '40px', background: '#ffffff', border: '1px solid #e4e9f0', borderRadius: '16px', boxShadow: '0 18px 45px rgb(15 23 42 / 9%)' }} role="status">Loading car details...</div>
      </section>
    )
  }

  if (loadError) {
    return (
      <section style={pageStyle}>
        <div style={{ width: 'min(100%, 680px)', padding: '40px', color: '#b42318', background: '#fef3f2', border: '1px solid #fecdca', borderRadius: '16px', boxShadow: '0 18px 45px rgb(15 23 42 / 9%)' }} role="alert">
          {loadError}
        </div>
      </section>
    )
  }

  return (
    <section style={pageStyle} aria-labelledby="edit-car-heading">
      <CarForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isSubmitting ? 'Updating car...' : 'Update car'}
        loading={isSubmitting}
        disabled={isSubmitting || isSuccess}
        serverError={submitError}
      >
        <p className="auth-eyebrow">Inventory</p>
        <h1 id="edit-car-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.75rem, 4vw, 2.15rem)' }}>
          Edit car
        </h1>
        <p className="auth-intro">Update the vehicle details in your dealership inventory.</p>
      </CarForm>
    </section>
  )
}

export default EditCar
