import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorFallback from './ui/ErrorFallback'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      return <ErrorFallback error={error} onRetry={this.handleRetry} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
