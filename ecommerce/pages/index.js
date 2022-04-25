import React from 'react';
import { client } from '../lib/client';
// import Head from 'next/head';
import { Product, FooterBanner, HeroBanner } from '../components';

// Move this code to main file:
// Video: https://www.youtube.com/watch?v=4mOkFXyxfsU
// Code: https://github.com/adrianhajdin/ecommerce_sanity_stripe

// Start command: npm run dev (inside 'ecommerce' folder)

const Home = ({ products, bannerData }) => {
  return (
    <>
      {/* <Head>
        <title>eCommerce Application</title>
      </Head> */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      <div className='products-heading'>
        <h2>Best-Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// Fetch data
// This is Next.js, so use 'getServerSideProps' instead of 'useEffect', as in React
export const getServerSideProps = async () => {
  // Create a Sanity query ('*' means fetch all):
  // grab all products from the Sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // Fetch data for the banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // Return the data so that we can we can populate the function above with the data -
  // be sure to pass these as props up above
  return {
    props: { products, bannerData },
  };
};

export default Home;
