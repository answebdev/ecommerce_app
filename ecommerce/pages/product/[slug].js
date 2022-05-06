// [slug].js (file-based routing in Next.js)
// 'slug' is the unique identifier that belongs to each product.
// Here in Next.js, we are inside the 'product' folder, and this component is for a product's details.
// The square brackets means that this is dynamic.
// For example, we can go to '/product/speaker', or 'product/headphones', etc.
// It's going to dynamically render it.

import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

// Start command: npm run dev (inside 'ecommerce' folder)

const ProductDetails = ({ product, products }) => {
  // Destructure the values from the product
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// If a page has dynamic routes and uses 'getStaticProps',
// it needs to define a list of paths to be statically generated.
// That way, Next.js knows what product details to get whenever a product is clicked on on the main page.
export const getStaticPaths = async () => {
  // Give us all the products, but do not return all of the data for all the products.
  // Rather, just return the current 'slug' property:
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// API call to get specific product clicked on.
// In Next.js, 'getStaticProps' is a function used when we want to pre-render the page at build time
// using the props returned.
// When should we use 'getStaticProps'? =>
// when the data required to render the page is available at build time ahead of a user's request,
// AND if the data comes from a headless CMS (which is exactly what we're trying to do here).
export const getStaticProps = async ({ params: { slug } }) => {
  // [0] because we only want to fetch the first product that matches this query:
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // Fetch all similar products
  const productsQuery = '*[_type == "product"]';

  // Get individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  // Return the data so that we can we can populate the function above with the data -
  // be sure to pass these as props up above
  return {
    props: { products, product },
  };
};

export default ProductDetails;
