import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

// STOPPED at 1:15:30
// Start command: npm run dev (inside 'ecommerce' folder)

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Adolf Schmuck All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer