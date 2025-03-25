import { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

function AllProducts() {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem('vendorFirmId');

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      if (firmId) {
      }
      const getAllData = await response.json();
      setProducts(getAllData.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to fetch Products');
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  // Delete Products by Id
  const DeleteProductById = async (productId) => {
    const userConfirmed = confirm(
      'Are you sure you want to delete this product?'
    );
    if (!userConfirmed) {
      return; // Exit if user cancels
    }

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((item) => item._id !== productId));

        alert('Product has been deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Delete failed:', errorData.message);
        alert(
          `Failed to delete product: ${errorData.message || 'Unknown error'}`
        );
      }
    } catch (error) {
      console.error('Failed to delete product');
    }
  };

  return (
    <div>
      {!products ? (
        <p>No Product has been added yet</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td> {product.productName} </td>
                  <td> {product.price} </td>
                  <td>
                    {product.image && (
                      <img
                        src={`${API_URL}/uploads/${product.image}`}
                        alt={product.productName}
                        style={{ width: '50px', height: '50px' }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => DeleteProductById(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllProducts;
