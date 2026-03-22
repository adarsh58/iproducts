import React from 'react'
import ProductContext from './ProductContext';

const ProductState = (props) => {
    const host="http://localhost:5000";
    const intialProducts=[];
    const [products, setProducts] = React.useState(intialProducts);
    
    const getProducts=async()=>{
        const response=await fetch(`${host}/api/products/fetchallproducts`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const data=await response.json();
        setProducts(data);
    }
    const getProductsbyUser=async()=>{
        const response=await fetch(`${host}/api/products/FetchAllProductsByUser`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const data=await response.json();
        setProducts(data);
    }

    const addProduct=async(title, description, price)=>{
        const response=await fetch(`${host}/api/products/AddProduct`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title, description, price})
        });
        const data=await response.json();
        setProducts(products.concat(data));
    }

   const deleteProduct=async(id)=>{
        const response=await fetch(`${host}/api/products/DeleteProduct/${id}`,{
            method:'DELETE',    
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const data=await response.json();
        const newProducts=products.filter((product)=>{return product._id!==id});
        setProducts(newProducts);
    }   



  return (
    <ProductContext.Provider value={{products, getProducts, addProduct, deleteProduct,getProductsbyUser}}>
      { props.children }
    </ProductContext.Provider>
  )
}

export default ProductState
