import React from 'react';
import PropertyList from '../components/PgList';
import Sidebar from '../components/Sidebar';

function AdminProperties() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <h2>All Properties</h2>
        <PropertyList isAdmin={true} />
      </div>
    </div>
  );
}

export default AdminProperties;