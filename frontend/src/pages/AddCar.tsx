import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { createCar, type CreateCarPayload } from '../services/api'
import { getApiErrorMessage } from '../utils/apiError'

interface CarFormValues {
  brand: string
  model: string
  year: string
  price: string
  mileage: string
  status: '' | CreateCarPayload['status']
}

type FormErrors = Partial<Record<keyof CarFormValues, string>>

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

const cardStyle = {
  width: 'min(100%, 680px)',
  padding: '40px',
  background: '#ffffff',
  border: '1px solid #e4e9f0',
  borderRadius: '16px',
  boxShadow: '0 18px 45px rgb(15 23 42 / 9%)',
}

function AddCar() {
  const { token } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<CarFormValues>(initialFormValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = <TField extends keyof CarFormValues>(
    field: TField,
    value: CarFormValues[TField],
  ) => {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
  }

  const validateForm = (): FormErrors => {
    const validationErrors: FormErrors = {}

    if (!formValues.brand.trim()) validationErrors.brand = 'Brand is required.'
    if (!formValues.model.trim()) validationErrors.model = 'Model is required.'
    if (!formValues.year) validationErrors.year = 'Year is required.'
    if (!formValues.price) validationErrors.price = 'Price is required.'
    if (!formValues.mileage) validationErrors.mileage = 'Mileage is required.'
    if (!formValues.status) validationErrors.status = 'Status is required.'

    return validationErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')
    setIsSuccess(false)

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

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
    }
  }

  return (
    <section style={pageStyle} aria-labelledby="add-car-heading">
      <div style={cardStyle}>
        <p className="auth-eyebrow">Inventory</p>
        <h1 id="add-car-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.75rem, 4vw, 2.15rem)' }}>
          Add a car
        </h1>
        <p className="auth-intro">Enter the vehicle details to add it to your dealership inventory.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="form-field">
              <label htmlFor="car-brand">Brand</label>
              <input id="car-brand" value={formValues.brand} onChange={(event) => updateField('brand', event.target.value)} placeholder="e.g. Toyota" aria-invalid={Boolean(errors.brand)} aria-describedby={errors.brand ? 'car-brand-error' : undefined} />
              {errors.brand && <p id="car-brand-error" className="form-message form-message--error">{errors.brand}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="car-model">Model</label>
              <input id="car-model" value={formValues.model} onChange={(event) => updateField('model', event.target.value)} placeholder="e.g. Camry" aria-invalid={Boolean(errors.model)} aria-describedby={errors.model ? 'car-model-error' : undefined} />
              {errors.model && <p id="car-model-error" className="form-message form-message--error">{errors.model}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="car-year">Year</label>
              <input id="car-year" type="number" min="1886" value={formValues.year} onChange={(event) => updateField('year', event.target.value)} placeholder="e.g. 2024" aria-invalid={Boolean(errors.year)} aria-describedby={errors.year ? 'car-year-error' : undefined} />
              {errors.year && <p id="car-year-error" className="form-message form-message--error">{errors.year}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="car-price">Price</label>
              <input id="car-price" type="number" min="0" value={formValues.price} onChange={(event) => updateField('price', event.target.value)} placeholder="e.g. 2500000" aria-invalid={Boolean(errors.price)} aria-describedby={errors.price ? 'car-price-error' : undefined} />
              {errors.price && <p id="car-price-error" className="form-message form-message--error">{errors.price}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="car-mileage">Mileage (km)</label>
              <input id="car-mileage" type="number" min="0" value={formValues.mileage} onChange={(event) => updateField('mileage', event.target.value)} placeholder="e.g. 15000" aria-invalid={Boolean(errors.mileage)} aria-describedby={errors.mileage ? 'car-mileage-error' : undefined} />
              {errors.mileage && <p id="car-mileage-error" className="form-message form-message--error">{errors.mileage}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="car-status">Status</label>
              <select id="car-status" value={formValues.status} onChange={(event) => updateField('status', event.target.value as CarFormValues['status'])} aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? 'car-status-error' : undefined} style={{ width: '100%', padding: '12px 14px', color: '#172033', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
              {errors.status && <p id="car-status-error" className="form-message form-message--error">{errors.status}</p>}
            </div>
          </div>

          {submitError && <p className="form-message form-message--error" role="alert">{submitError}</p>}
          <button className="auth-submit" type="submit" disabled={isLoading || isSuccess}>
            {isLoading && <span className="button-spinner" aria-hidden="true" />}
            {isLoading ? 'Adding car...' : 'Add car'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddCar
