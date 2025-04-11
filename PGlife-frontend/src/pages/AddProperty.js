import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price) {
      alert("All fields are required.");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("location", formData.location);
    payload.append("price", formData.price);

    axios.post("http://localhost/pglife/addProperty.php", payload)
      .then(response => {
        if (response.data.status === "success") {
          alert("Property added successfully!");
          setFormData({ name: "", location: "", price: "" });
        } else {
          alert("Error: " + response.data.message);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
