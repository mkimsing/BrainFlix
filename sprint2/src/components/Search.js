import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    if (!this.props.location.query) {
      return (
        <>
          <h1> Search </h1>
          <h4> Please enter a query to search</h4>
        </>
      )
    }
    return (
      <div>
        <h1> Search</h1>
        <h4> {this.props.location.query.search}</h4>
      </div>
    )
  }
}
