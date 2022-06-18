//[] in file name === dynamic slug --> file based routing
import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={urlFor(image && image[index])} />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)} 
                alt={name}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick=""><AiOutlineMinus /></span>
              <span className="num" onClick="">0</span>
              <span className="plus" onClick=""><AiOutlinePlus /></span>
            </p>
          </div>

          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">Add to Cart</button>
            <button type="button" className="buy-now" onClick="">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
export const getStaticPaths = async () => {
  //Get all the procuts but only return the current slug property
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

//Next.js will pre-render this page at build time using the props returned by getStaticProps -- Data already exist on the page
export const getStaticProps = async ({ params: {slug}}) => {
  //Grab Details for the based on the slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  //Grab Similiar Products
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductDetails