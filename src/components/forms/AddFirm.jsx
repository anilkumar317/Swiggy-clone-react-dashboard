import { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');

      if (!loginToken) {
        alert('User not authonticated or token should be expired');
        return;
      }

      const formData = new FormData();

      formData.append('firmName', firmName),
        formData.append('area', area),
        formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          token: loginToken,
        },
        body: formData,
      });

      const data = await response.json();

      localStorage.setItem('firmId', data.firmId);

      if (response.ok) {
        console.log('Response:', data);
        setFirmName('');
        setArea('');
        setCategory([]);
        setRegion([]);
        setOffer('');
        setFile(null);
        alert('Firm has been added successfully ');
        showProductHandler();
      } else if (data.message === 'vendor can have only one firm') {
        alert('Firm Exists 🎂. Only 1 firm can be added  ');
      } else {
        alert('Failed to add Firm');
      }
    } catch (error) {
      console.error('Faliled to add firm');
    }
  };

  return (
    <div className="firm-section">
      <form
        className="table-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h3>Add Firm</h3>

        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />

        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="check-inp">
          <label>Category</label>
          <div className="inputs-container">
            <div className="checkbox-container">
              <label>Veg</label>
              <input
                type="checkbox"
                name="category"
                value="veg"
                checked={category.includes('veg')}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkbox-container">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                name="category"
                value="non-veg"
                checked={category.includes('non-veg')}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <div className="check-inp">
          <label>Region</label>
          <div className="inputs-container">
            <div className="checkbox-container">
              <label>South-Indian</label>
              <input
                type="checkbox"
                name="region"
                value="south-indian"
                checked={region.includes('south-indian')}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkbox-container">
              <label>North-Indian</label>
              <input
                type="checkbox"
                name="region"
                value="north-indian"
                checked={region.includes('north-indian')}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkbox-container">
              <label>Bakery</label>
              <input
                type="checkbox"
                name="region"
                value="bakery"
                checked={region.includes('bakery')}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
