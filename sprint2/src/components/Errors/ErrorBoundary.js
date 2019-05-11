import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1> Something went wrong... </h1>
          <Link to='/'><button> Back to Home </button> </Link>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary