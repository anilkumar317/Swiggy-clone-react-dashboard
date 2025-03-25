import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className="error-section">
        <h1>404</h1>
        <p>Page Not Found </p>
        <Link
          to="/"
          style={{
            width: '',
            fontSize: '1.2rem',
            color: 'steelblue',
            textDecoration: 'none',
            boxShadow: '1px 2px 3px   rgba(0, 0, 0, 0.3)',
            borderRadius: '3px',
            padding: '3px 3px',
          }}
        >
          Back To Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
