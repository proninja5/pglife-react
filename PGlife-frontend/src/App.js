import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyList from './pages/PropertyList';
import AddProperty from './pages/AddProperty';
import Signup from './pages/Signup';
import LoginForm from './pages/LoginForm';
import ImageUpload from './components/ImageUpload';


import AdminPanel from './components/AdminPanel';
import Dashboard from './pages/Dashboard';
import AdminProperties from './pages/AdminProperties';
import AdminAddProperty from './pages/AdminAddProperty';
import AdminEnquiries from './pages/AdminEnquiries';

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/properties"
          element={
            <>
              <Navbar />
              <PropertyList />
            </>
          }
        />
        <Route
          path="/add-property"
          element={
            <>
              <Navbar />
              <AddProperty />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginForm />
            </>
          }
        />
        <Route
          path="/upload-image"
          element={
            <>
              <Navbar />
              <ImageUpload />
            </>
          }
        />

        {}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPanel>
              <Dashboard />
            </AdminPanel>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <AdminPanel>
              <AdminProperties />
            </AdminPanel>
          }
        />
        <Route
          path="/admin/add"
          element={
            <AdminPanel>
              <AdminAddProperty />
            </AdminPanel>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <AdminPanel>
              <AdminEnquiries />
            </AdminPanel>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
