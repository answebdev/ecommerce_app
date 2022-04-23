import React from 'react'
import Link from 'next/link'

// STOPPED at 40:25

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>SMALL TEXT</p>
            <h3>MID TEXT</h3>
            <img className='hero-banner-image' src="" alt="Headphones" />
            <div>
                <Link href="/product/id">
                    <button type='button'>BUTTON TEXT</button>
                </Link>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>DESCRIPTION</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner