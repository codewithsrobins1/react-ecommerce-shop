import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner} from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}
          />)
        }
      </div>

      <FooterBanner />
    </>
  )
}

//Next.js will pre-render this page on each request using the data returned by getServerSideProps.
export const getServerSideProps = async () => {
  //Grab all products from Sanity Dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  //Grab all Banner Data from Sanity Dashboard
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;