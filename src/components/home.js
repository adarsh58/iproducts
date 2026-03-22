import React, { useEffect } from 'react'
import ProductContext from '../contextapi/ProductContext';
import Productcard from './productcard';


const Home = () => {
    const { products, getProductsbyUser } = React.useContext(ProductContext);

    useEffect(() => {
        getProductsbyUser();
    }, []);
    
  return (
    <div>
        <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Welcome to the Iproducts</h1>  
        <p style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Here are some of our products:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products && products.map((product) => (
               <Productcard key={product._id} title={product.title} description={product.description} price={product.price} img={product.img}    />
            ))}
        </div>

    </div>
  )
}

export default Home
