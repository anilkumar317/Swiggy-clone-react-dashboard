function Navbar({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  logoutHandler,
}) {
  const firmName = localStorage.getItem('vendorFirmName');

  return (
    <div className="nav-section">
      <div className="company">Vendor Dashboard</div>
      <div className="firm-name">
        <h4> FirmName:{firmName}</h4>
      </div>
      <div className="user-auth">
        {!showLogout ? (
          <>
            <span onClick={showLoginHandler}>Login</span> /
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logoutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
}

export default Navbar;
