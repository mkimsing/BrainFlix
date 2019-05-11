import React from 'react'
import { Link } from 'react-router-dom'
export default function UnspecifiedRoute() {
  return (
    <div>
      <h1> There is no page with that name!</h1>
      <Link to='/'><button> Back to Home </button> </Link>
    </div>
  )
}
