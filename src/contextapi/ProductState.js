import React from 'react'
import ProductContext from './ProductContext';

const ProductState = (props) => {
    const host="http://localhost:5000";
    const intialProducts=[];
    const [products, setProducts] = React.useState(intialProducts);
    const [allproducts, setAllProducts] = React.useState(intialProducts);

    const getProducts=async()=>{
        const response=await fetch(`${host}/api/products/fetchallproducts`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const data=await response.json();
        // from dummyjson API, value is { products: [...] }
        console.log('data', data);
        setAllProducts(Array.isArray(data) ? data : data.products || []);
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

    const addProduct=async(id,title, description, price, img)=>{
        
        const response=await fetch(`${host}/api/products/AddProduct`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id,title, description, price,img})
        });
         console.log('Added product:', { id,title, description, price,img});
        const data=await response.json();
        console.log('Response from add product:', data);
        if (!response.ok) {
            console.error('Failed to add product:', data);
            return;
        }
        console.log('Added product 1:', data);
        setProducts(products.concat(data));
    }

const fetchProductbyId=async(id)=>{
        const response=await fetch(`${host}/api/products/FetchProductsById?id=${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const data=await response.json();   
        console.log('Fetched product by ID:', data);
        return data;
    
    } 

   const deleteProduct=async(id)=>{
        const response=await fetch(`${host}/api/products/DeleteProduct?id=${id}`,{
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
    <ProductContext.Provider value={{products, allproducts, getProducts, addProduct, deleteProduct,getProductsbyUser,fetchProductbyId}}>
      { props.children }
    </ProductContext.Provider>
  )
}

export default ProductState
