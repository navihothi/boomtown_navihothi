import React from 'react'
import { Link } from 'react-router-dom'

const Logout = ({
  setCSRFToken,
}) => (
  <Link to='/'>
    <button
      onClick={ () => {
        localStorage.removeItem('token')
        setCSRFToken(null)
      }}>
      logout
    </button>
  </Link>
) 

export default Logout;