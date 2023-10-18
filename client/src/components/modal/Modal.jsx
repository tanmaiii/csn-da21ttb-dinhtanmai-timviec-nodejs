import React from 'react'
import './modal.scss'

export default function Modal({children}) {
  return (
    <div className='Modal'>
            <div className="Modal__wrapper">
                    {children}
            </div>
    </div>
  )
}
