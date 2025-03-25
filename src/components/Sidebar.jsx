function Sidebar({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
}) {
  return (
    <div className="sidebar-section">
      <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ''}

        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products </li>
        <li>User Details</li>
      </ul>
    </div>
  );
}

export default Sidebar;
