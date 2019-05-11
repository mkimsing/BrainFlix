import React from 'react'
import { Link } from 'react-router-dom'
export default function AxiosError(props) {
  let { status, statusText, data } = props.error
  return (
    <div>
      <h1> Something went wrong... </h1>
      <h3> {`Error ${status} ${statusText}`}</h3>
      <h3> {data.message} </h3>
      <Link to='/'><button> Back to Home </button> </Link>
    </div>
  )
}
