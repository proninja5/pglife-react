import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./PropertyList.css";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [modalImage, setModalImage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [enquiringProperty, setEnquiringProperty] = useState(null);
  const [formData, setFormData] = useState({});
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios.get("http://localhost/pglife/getProperties.php").then((res) => {
      if (res.data.status === "success") {
        const props = res.data.data;
        const withImages = props.map(async (prop) => {
          const res = await axios.get("http://localhost/pglife/getPropertyImages.php", {
            params: { property_id: prop.id },
          });
          return { ...prop, images: res.data.images };
        });

        Promise.all(withImages).then((final) => setProperties(final));
      }
    });
  };

  const handleImageUpload = (propertyId) => {
    const files = selectedFiles[propertyId];
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images[]", file);
    });
    formData.append("property_id", propertyId);

    axios
      .post("http://localhost/pglife/uploadImage.php", formData)
      .then(() => {
        fetchProperties();
        setSelectedFiles((prev) => ({ ...prev, [propertyId]: null }));
      });
  };

  const handleFileChange = (e, propertyId) => {
    setSelectedFiles((prev) => ({ ...prev, [propertyId]: e.target.files }));
  };

  const handleDeleteImage = (imageId) => {
    axios
      .post("http://localhost/pglife/deleteImage.php", { image_id: imageId })
      .then(() => fetchProperties());
  };

  const handleViewImage = (imagePath) => {
    setModalImage(imagePath);
    setShowImageModal(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData(property);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/pglife/updateProperty.php", formData)
      .then(() => {
        setEditingProperty(null);
        fetchProperties();
      });
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .post("http://localhost/pglife/deleteProperty.php", { property_id: propertyId })
        .then(() => fetchProperties());
    }
  };

  const handleEnquiry = (property) => {
    setEnquiringProperty(property);
    setEnquiryMessage("");
  };

  const handleEnquirySubmit = () => {
    axios
      .post("http://localhost/pglife/sendEnquiry.php", {
        property_id: enquiringProperty.id,
        message: enquiryMessage,
      })
      .then(() => {
        alert("Enquiry sent successfully!");
        setEnquiringProperty(null);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4 fw-bold">Explore PG Listings</h2>
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4 mb-4" key={property.id}>
            <div className="card shadow rounded-4 border-0 property-card h-100">
              <div className="card-body">
                <h5 className="card-title text-info">{property.name}</h5>
                <p className="card-text text-secondary">
                  <strong>📍 Location:</strong> {property.location}
                  <br />
                  <strong>💰 Price:</strong> ₹{parseFloat(property.price).toFixed(2)} / month
                </p>

                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, property.id)}
                  className="form-control form-control-sm mb-2"
                />

                {selectedFiles[property.id] && selectedFiles[property.id].length > 0 && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleImageUpload(property.id)}
                    className="mb-2"
                  >
                    Upload
                  </Button>
                )}

                <div className="image-preview d-flex flex-wrap gap-2">
                  {property.images &&
                    property.images.map((image) => (
                      <div key={image.id} className="position-relative">
                      <img
                        src={`http://localhost/pglife/${image.path}?t=${new Date().getTime()}`}
                        alt="preview"
                        className="img-thumbnail shadow-sm"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleViewImage(`http://localhost/pglife/${image.path}`)}
                      />
                        <button
                          className="btn btn-sm btn-danger position-absolute top-0 end-0"
                          onClick={() => handleDeleteImage(image.id)}
                          style={{ padding: "2px 6px", fontSize: "10px" }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="card-footer d-flex justify-content-between bg-light border-0">
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(property)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(property.id)}>
                  🗑️ Delete
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEnquiry(property)}>
                  📩 Enquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg">
        <Modal.Body className="text-center">
          <img src={modalImage} alt="Full Preview" className="img-fluid rounded" />
        </Modal.Body>
      </Modal>

      {}
      <Modal show={!!editingProperty} onHide={() => setEditingProperty(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Button className="mt-2 w-100" variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {}
      <Modal show={!!enquiringProperty} onHide={() => setEnquiringProperty(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={enquiryMessage}
              onChange={(e) => setEnquiryMessage(e.target.value)}
              placeholder="Type your enquiry message..."
              required
            />
          </Form.Group>
          <Button className="mt-3 w-100" variant="success" onClick={handleEnquirySubmit}>
            Submit Enquiry
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PropertyList;
