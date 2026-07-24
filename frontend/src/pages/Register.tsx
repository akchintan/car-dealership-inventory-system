import { useState, type FormEvent } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { getApiErrorMessage } from '../utils/apiError'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { success } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await api.post('/api/auth/register', { name, email, password })
      success('Registration complete. You can now sign in to your account.')
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to register.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="auth-page">
        <div className="auth-card">
          <p className="auth-eyebrow">Dealer portal</p>
          <h1>Create your account</h1>
          <p className="auth-intro">
            Set up your account and keep your vehicle inventory moving.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="register-name">Full name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@dealership.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Create a password"
                required
              />
            </div>

            {error && (
              <p className="form-message form-message--error" role="alert">
                {error}
              </p>
            )}
            <button className="auth-submit" type="submit" disabled={isLoading}>
              {isLoading && <span className="button-spinner" aria-hidden="true" />}
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
