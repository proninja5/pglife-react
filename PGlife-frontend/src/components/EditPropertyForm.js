import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPropertyForm = ({ propertyId, onUpdate }) => {
  const [property, setProperty] = useState({ name: '', location: '', price: '', description: '' });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); 

  useEffect(() => {
    if (!propertyId) return;

    axios.get(`http://localhost/pglife/getPropertyById.php?id=${propertyId}`)
      .then(res => {
        if (res.data.status === 'success') {
          setProperty(res.data.property);
        } else {
          setMessage(res.data.message || "Failed to fetch property.");
          setStatus('error');
        }
      })
      .catch(() => {
        setMessage("Error fetching property.");
        setStatus('error');
      });
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...property, id: propertyId };

    axios.post("http://localhost/pglife/updateProperty.php", payload)
      .then(res => {
        console.log("Update response:", res.data); 
        setMessage(res.data.message);
        setStatus(res.data.status);

        if (res.data.status === 'success') {
          
          setTimeout(() => {
            onUpdate();
          }, 1000);
        }
      })
      .catch(() => {
        setMessage("Error updating property.");
        setStatus('error');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h5>Edit Property</h5>

      <input
        name="name"
        value={property.name}
        onChange={handleChange}
        className="form-control my-2"
        placeholder="Name"
        required
      />
      <input
        name="location"
        value={property.location}
        onChange={handleChange}
        className="form-control my-2"
        placeholder="Location"
        required
      />
      <input
        name="price"
        value={property.price}
        onChange={handleChange}
        type="number"
        className="form-control my-2"
        placeholder="Price"
        required
      />


      <button className="btn btn-primary" type="submit">Update</button>

      {message && (
        <div className={`alert mt-2 ${status === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default EditPropertyForm;
