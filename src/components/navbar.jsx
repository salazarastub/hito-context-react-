import React from 'react';

const Navbar = () => {
  const total = 25000;
  const token = false;
  const formattedTotal = total.toLocaleString();

  return (
    <nav className="d-flex align-items-center p-3 border-bottom">
      <div className="d-flex gap-2">
        <button className="btn btn-primary">🍕 Home</button>

        {token ? (
          <>
            <button className="btn btn-secondary">🔓 Profile</button>
            <button className="btn btn-danger">🔒 Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-success">🔐 Login</button>
            <button className="btn btn-warning">🔐 Register</button>
          </>
        )}
      </div>

      <div className="ms-auto">
        <button className="btn btn-outline-dark">🛒 Total: ${formattedTotal}</button>
      </div>
    </nav>
  );
};

export default Navbar;