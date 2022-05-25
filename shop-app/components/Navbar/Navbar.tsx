import "./Navbar.css";

function Navbar(props: any) {

  function loadShops() {
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="../../assets/logo-04.png" alt="brand-page" />
      </div>

      <div className="navbar__items">
        <ul>
          <li>
            <button
              onClick={() => {
                props.setOpenForm(true);
              }}
            >
              <span>➕</span>Add Shop
            </button>
          </li>
          <li>
            <button
            onClick={loadShops}
            >
              <span>⬇️</span>All Shops
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
