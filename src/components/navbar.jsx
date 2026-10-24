import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { total, itemCount } = useCart();
  const token = false;

  return (
    <nav className="d-flex align-items-center p-3 border-bottom">
      <div className="d-flex gap-2 flex-wrap">
        <Link to="/" className="btn btn-primary">🍕 Home</Link>

        {token ? (
          <>
            <Link to="/profile" className="btn btn-secondary">🔓 Profile</Link>
            <button className="btn btn-danger">🔒 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-success">🔐 Login</Link>
            <Link to="/register" className="btn btn-warning">🔐 Register</Link>
          </>
        )}
      </div>

      <div className="ms-auto">
        <Link to="/cart" className="btn btn-outline-dark">
          🛒 {itemCount} item(s) · ${total.toLocaleString()}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;