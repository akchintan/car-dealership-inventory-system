import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

export interface CarFormValues {
  brand: string
  model: string
  year: string
  price: string
  mileage: string
  status: '' | 'available' | 'sold'
}

interface CarFormProps {
  initialValues: CarFormValues
  onSubmit: (values: CarFormValues) => void | Promise<void>
  submitLabel: string
  loading: boolean
  disabled?: boolean
  serverError?: string
  children?: ReactNode
}

type FormErrors = Partial<Record<keyof CarFormValues, string>>

const cardStyle = {
  width: 'min(100%, 680px)',
  padding: '40px',
  background: '#ffffff',
  border: '1px solid #e4e9f0',
  borderRadius: '16px',
  boxShadow: '0 18px 45px rgb(15 23 42 / 9%)',
}

function CarForm({ initialValues, onSubmit, submitLabel, loading, disabled = false, serverError, children }: CarFormProps) {
  const [formValues, setFormValues] = useState<CarFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    setFormValues(initialValues)
    setErrors({})
  }, [initialValues])

  const updateField = <TField extends keyof CarFormValues>(field: TField, value: CarFormValues[TField]) => {
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

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    await onSubmit(formValues)
  }

  return (
    <Card style={cardStyle}>
      {children}
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

        {serverError && <p className="form-message form-message--error" role="alert">{serverError}</p>}
        <Button type="submit" loading={loading} disabled={disabled}>
          {submitLabel}
        </Button>
      </form>
    </Card>
  )
}

export default CarForm
