import { useState } from 'react';
import { API_URL } from '../../data/apiPath';

function AddProduct() {
  const [productName, setProdctName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestsellerChange = (e) => {
    const value = e.target.value === 'true';
    setBestseller(value);
  };

  const handleImageUoload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('vendorFirmId');

      if (!loginToken || !firmId) {
        console.log('User not authenticated');
        console.log(firmId);
      }

      const formData = new FormData();

      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestseller', bestseller);
      formData.append('image', image);
      category.forEach((value) => {
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Response:', data);
        alert('Product added successfully');
        setProdctName(''),
          setPrice(''),
          setDescription(''),
          setCategory([]),
          setBestseller(false);
      } else {
        console.log('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert('Login Failed');
    }
  };

  return (
    <>
      <div className="firm-section">
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit} className="table-form">
          <label> Product Name</label>
          <input
            type="text"
            placeholder="Enter your product"
            value={productName}
            onChange={(e) => setProdctName(e.target.value)}
          />
          <label> Price</label>
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="check-inp">
            <label>Category</label>
            <div className="checkbox-container">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes('veg')}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkbox-container">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes('non-veg')}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
          <div className="check-inp">
            <label> Bestseller</label>
            <label>Yes</label>
            <input
              type="radio"
              value="true"
              checked={bestseller === true}
              onChange={handleBestsellerChange}
            />
            <label>No</label>
            <input
              type="radio"
              value="false"
              checked={bestseller === false}
              onChange={handleBestsellerChange}
            />
          </div>
          <label> Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label> Product Image</label>
          <input type="file" name="image" onChange={handleImageUoload} />
          <button type="submit" className="btn-submit">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
