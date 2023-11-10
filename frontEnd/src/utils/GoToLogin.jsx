import React from 'react'
import { Link } from 'react-router-dom'

function GoToLogin() {
  return (
    <div className='max-w-md mx-auto rounded-md shadow-md px-6 py-3 my-10'>
    <h3 className='font-semibold text-green-500'>You have created an account successufuly</h3>
      <Link className='my-3 font-bold underline text-xl' to={"/signIn"}>
      go to Log in
      </Link>
    </div>
  )
}

export default GoToLogin
