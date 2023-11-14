import React from 'react'
import './notFoundData.scss'
import img from '../../assets/images/notfound.png'

export default function NotFoundData() {
  return (
    <div className='notFoundData'>
        <img src={img} alt="" />
        <h4>Không tìm thấy.</h4>
    </div>
  )
}
