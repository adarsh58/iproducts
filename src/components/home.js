import React, { useEffect } from 'react'
import ProductContext from '../contextapi/ProductContext';
import Productcard from './productcard';
import AddProducts from './addProducts';


const Home = () => {
    const { products, getProductsbyUser,addProduct ,deleteProduct} = React.useContext(ProductContext);

    useEffect(() => {
        getProductsbyUser();
    }, []);
    
    const addProducthandler=async(id,title, description, price, img)=>{
         console.log('Adding product home:', { id, title, description, price, img });
         await addProduct(id, title, description, price, img );
        //  await getProductsbyUser();
    }   
    
    const deleteProductHandler=async(id)=>{
       console.log('Deleting product with ID:', id);
        await deleteProduct(id);
        //  await getProductsbyUser();  
        // Implement delete logic here, e.g., call a context function to delete the product and then refresh the product list.
    }

  return (
    <div>
        <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Welcome to the Iproducts</h1>  
        <AddProducts addProduct={addProducthandler}/>
        <p style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Here are some of our products:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Array.isArray(products) && products.map((product) => (
               <Productcard key={product._id} id={product._id}  title={product.title} description={product.description} price={product.price} img={product.img}  deleteProduct={deleteProductHandler}  />
            ))}
        </div>

    </div>
  )
}

export default Home
