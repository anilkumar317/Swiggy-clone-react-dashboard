import { useState } from 'react';
import { API_URL } from '../../data/apiPath';

function Register({ showLoginHandler }) {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(false);

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = data;

      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const register = await response.json();

      if (response.ok) {
        alert('Vendor registered successfully');
        {
          showLoginHandler();
        }
        setData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
      setError(true);
    }
  };
  return (
    <>
      <div className="register-section">
        <h3>Vendor Register</h3>
        <form className="auth-form" onSubmit={submitHandler}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            placeholder="Enter your name"
            onChange={onchangeHandler}
          ></input>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter your email"
            onChange={onchangeHandler}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={onchangeHandler}
          />
          <button type="submit" className="btn-submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
