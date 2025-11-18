import React from 'react'

const NoState = ({text = 'Record Not Found'}) => {
  return (
    <div className='text-center py-5'>{text}</div>
  )
}

export default NoState