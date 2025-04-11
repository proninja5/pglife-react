
🏠 PG Life - PG Listing Web App

PG Life is a full-stack web application for listing and managing Paying Guest (PG) accommodations. The project includes features like property listing, image uploads, filters, enquiry system, and admin controls. The frontend is made in React with Bootstrap, and the backend is in PHP with MySQL.

📁 Project Structure

pglife/
├── pglife-frontend/     # React frontend (runs on localhost:3000)
├── pglife-backend/      # PHP backend + image upload APIs
└── README.md

🚀 Features

- 👤 User Signup & Login
- 🏡 Add/Edit/Delete PG Properties
- 🖼️ Upload Multiple Images (with preview & delete)
- 📌 Set Cover Image & Reorder Gallery
- 🔍 Filter PGs by Location and Price
- 💡 Lightbox Image Preview
- 📩 PG Enquiry/Booking Form
- 🛠️ Admin Panel (basic layout)

🛠️ Tech Stack

Frontend: React, Bootstrap, Axios
Backend: Core PHP, MySQL
Tools: XAMPP (Apache + MySQL)

⚙️ Local Setup Instructions

🔽 Clone Repository

git clone https://github.com/proninja5/pglife-react.git
cd pglife

💻 Frontend Setup

cd pglife-frontend
npm install
npm start

Opens at: http://localhost:3000

🐘 Backend Setup

1. Move pglife-backend/ folder to C:/xampp/htdocs/
2. Open XAMPP Control Panel, start Apache and MySQL
3. Go to http://localhost/phpmyadmin
4. Create a new database named pglife
5. Run the following SQL queries to create tables:

🗃️ Database Tables

-- users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- properties
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- property_images
CREATE TABLE property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  image_path VARCHAR(255),
  is_cover BOOLEAN DEFAULT 0
);

-- enquiries
CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔗 API Endpoints (Backend)

/signup.php         POST   Register a new user
/login.php          POST   Login user
/addProperty.php    POST   Add new PG property
/updateProperty.php POST   Update PG details
/deleteProperty.php POST   Delete a PG listing
/getProperties.php  GET    Fetch all properties
/uploadImage.php    POST   Upload property images
/deleteImage.php    POST   Delete image
/setCoverImage.php  POST   Set cover image
/getPropertyImages.php POST Get images of a property
/sendEnquiry.php    POST   Submit enquiry form

👤 Author

Name: Komal Kumari
Email: komalarya05032000@gmail.com
GitHub: https://github.com/proninja5
LinkedIn: https://www.linkedin.com/in/komal-kumari-5a0596239/

📌 Notes

- Designed for demo/portfolio/learning purposes.
- You can add admin login, JWT authentication, image compression, and online hosting in future versions.

📃 License

This project is licensed under the MIT License.
