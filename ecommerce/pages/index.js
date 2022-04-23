import React from 'react';

// Move this code to main file:
// Video: https://www.youtube.com/watch?v=4mOkFXyxfsU
// Code: https://github.com/adrianhajdin/ecommerce_sanity_stripe
// Start command: npm run dev (inside 'ecommerce' folder)

// Stop at 31:30

const Home = () => {
  return (
    <>
      Hero Banner
      <div className='products-heading'>
        <h2>Best-Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>
      Footer
    </>
  );
};

export default Home;
