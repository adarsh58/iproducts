import React, { useCallback } from 'react'
import ProductContext from './ProductContext';

const ProductState = (props) => {
    const host = "https://iproducts-two.vercel.app";
    // https://iproducts-two.vercel.app http://localhost:5000
    
    const intialProducts = [];
    const [products, setProducts] = React.useState(intialProducts);
    const [allproducts, setAllProducts] = React.useState(intialProducts);

    const getProducts = useCallback(async () => {
        const response = await fetch(`${host}/api/products/fetchallproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        // from dummyjson API, value is { products: [...] }

        setAllProducts(Array.isArray(data) ? data : data.products || []);
    }, [])
    const getProductsbyUser = useCallback(async () => {
        const response = await fetch(`${host}/api/products/FetchAllProductsByUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setProducts(data);
    }, [])

    const addProduct = useCallback(async (id, title, description, price, img) => {

        const response = await fetch(`${host}/api/products/AddProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id, title, description, price, img })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Failed to add product:', data);
            return;
        }

        setProducts(products.concat(data));
    }, [products])

    const fetchProductbyId = useCallback(async (id) => {
        const response = await fetch(`${host}/api/products/FetchProductsById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();

        return data;

    }, [])

    const deleteProduct = useCallback(async (id) => {
        const response = await fetch(`${host}/api/products/DeleteProduct?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        await response.json();
        const newProducts = products.filter((product) => { return product._id !== id });
        setProducts(newProducts);
    }, [products])

    const loginUser = useCallback(async (email, password) => {
        console.log('loginUser called with:', { email, password });
       try {
         const response = await fetch(`${host}/api/auth/LoginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log('Response from login API:', response);
        const data = await response.json();
          return data;
       } catch (error ) {
        console.error('Error during login:', error);
        return { success: false, message: 'Login failed due to network error' };
        
       }
    
      

    }
        , [])



    return (
        <ProductContext.Provider value={{ products, allproducts, getProducts, addProduct, deleteProduct, getProductsbyUser, fetchProductbyId,loginUser }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState
