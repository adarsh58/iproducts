import React, { useEffect } from 'react'

const Home = () => {

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/products/FetchAllProductsByUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
    };
    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
        <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Welcome to the Iproducts</h1>  
        
    </div>
  )
}

export default Home
