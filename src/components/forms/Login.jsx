import { useState } from 'react';
import { API_URL } from '../../data/apiPath';
// import { useNavigate } from 'react-router-dom';

function Login({ showWelcomeHandler }) {
  const [input, setInput] = useState({ email: '', password: '' });
  // const navigate = useNavigate();

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem('vendorFirmId'); // to remove previous vendorFirmId

      // Login API Call
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input.email, password: input.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Invalid credentials');
        return;
      }

      alert('Login successful');

      if (!data.token) {
        alert('Login failed: Token not received');
        return;
      }

      // Store token and show welcome
      localStorage.setItem('loginToken', data.token);
      showWelcomeHandler();
      setInput({ email: '', password: '' });

      // Fetch Vendor Data
      const vendorId = data.vendorId;
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`
      );
      window.location.reload();
      const vendorData = await vendorResponse.json();

      if (!vendorResponse.ok) {
        alert('Failed to fetch vendor data');
        return;
      }

      // Extract firm data
      const {
        vendor: { firm },
      } = vendorData;
      const vendorFirmId = firm.length > 0 ? firm[0]._id : null;
      const vendorFirmName = firm.length > 0 ? firm[0].firmName : null;

      // Store firm ID if it exists
      if (vendorFirmId && vendorFirmName) {
        localStorage.setItem('vendorFirmId', vendorFirmId);
        localStorage.setItem('vendorFirmName', vendorFirmName);
      }

      if (firm.length === 0) {
        alert('Pls add atleast one firm to the application to proceed! ');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-section">
      <h3>Vendor Login</h3>
      <form onSubmit={submitHandler} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={input.email}
          onChange={onchangeHandler}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={input.password}
          onChange={onchangeHandler}
        />
        <button type="submit" className="btn-submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Login;
