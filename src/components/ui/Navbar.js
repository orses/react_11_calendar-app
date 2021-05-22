import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Pepe</span>
      <button className="btn btn-outline-danger">
        <i aria-hidden="true" className="fa fa-sign-out-alt"></i>{' '}
        <span>Log out</span>
      </button>
    </div>
  );
};

export default Navbar;
