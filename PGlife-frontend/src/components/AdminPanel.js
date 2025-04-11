import React from 'react';
import Sidebar from './Sidebar';

const AdminPanel = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-4 w-100 bg-light" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminPanel;
