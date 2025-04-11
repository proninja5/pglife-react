import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/pglife/getEnquiries.php')
      .then(response => setEnquiries(response.data))
      .catch(error => console.error('Error fetching enquiries:', error));
  }, []);

  return (
    <div>
      <h2 className="mb-4">User Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.id}>
                <td>{enquiry.id}</td>
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.phone}</td>
                <td>{enquiry.message}</td>
                <td>{enquiry.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEnquiries;
