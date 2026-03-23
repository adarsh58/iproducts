
import React, { useEffect } from 'react'
import ProductContext from '../contextapi/ProductContext';

const AddProducts = ({ addProduct: addProductFromProps }) => {

  const { allproducts, getProducts, fetchProductbyId, addProduct } = React.useContext(ProductContext);
  useEffect(() => {
    getProducts();
    if (allproducts) {
    }
  }, []);

  const handleCategorySelect = (data) => {
    fetchProductbyId(data).then(product => {

      const insertProduct = addProductFromProps || addProduct;
      if (!insertProduct) {
        console.error('No addProduct function provided');
        return;
      }

      insertProduct(product.id, product.title, product.description, product.price, product.thumbnail);

      // You can add logic here to display the fetched product details
    }).catch(error => {
      console.error('Error fetching product:', error);
    });

    // You can add logic here to filter products based on the selected category
  }
  return (
    <div className='container'>
      <p>Click on the button below to add your products</p>
      <div className="categoryselect">
        <select
          onChange={(event) => handleCategorySelect(event.target.value)}
          className="form-select"
          aria-label="Default select example"
          defaultValue=""
        >
          <option value="" disabled>--select product--</option>
          {allproducts &&
            allproducts.map((e, i) => {

              return (
                <option key={i} value={e.id}>
                  {e.title}
                </option>
              );
            })}
        </select>
      </div>

    </div>
  )
}

export default AddProducts
