import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Link to="/lists">
        <p>
          hola main
        </p>
      </Link>
    )
  }
}