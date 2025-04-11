import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
      <h4>PGLife Admin</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/properties">Manage Properties</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/add">Add Property</Link>
        </li>
        <li className="nav-item"><a className="nav-link text-white" href="#/enquiries">User Enquiries</a>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
