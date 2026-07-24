import axios from 'axios'
import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import api from '../services/api'

interface LoginResponse {
  token: string
}

interface ApiErrorResponse {
  message?: string
}

function Login() {
  const { login } = useAuth()
  const { success } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await api.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      })

      login(data.token, { email })
      success('Signed in successfully.')
    } catch (requestError) {
      if (axios.isAxiosError<ApiErrorResponse>(requestError)) {
        setError(requestError.response?.data.message ?? 'Unable to log in.')
      } else {
        setError('Unable to log in.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="auth-page">
        <div className="auth-card">
          <p className="auth-eyebrow">Dealer portal</p>
          <h1>Welcome back</h1>
          <p className="auth-intro">
            Sign in to manage your dealership inventory.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@dealership.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
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
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
