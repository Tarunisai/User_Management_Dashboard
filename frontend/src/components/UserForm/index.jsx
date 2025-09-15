import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; 
import './index.css';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchUsers } = useContext(UserContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    street: '',
    city: '',
    zipcode: '',
    lat: '',
    lng: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const API_BASE = process.env.NODE_ENV === 'production'
    ? 'https://user-management-dashboard-v40x.onrender.com/api/users'
    : '/api/users';

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${API_BASE}/${id}`)
        .then((res) => {
          const user = res.data.data;
          setForm({ ...user });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load user data.');
          setLoading(false);
        });
    }
  }, [id, API_BASE]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email) {
      setError('Name and Email are required.');
      return;
    }

    if (!validateEmail(form.email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      if (id) {
        await axios.put(`${API_BASE}/${id}`, form);
        setSuccess('User updated successfully!');
      } else {
        await axios.post(API_BASE, form);
        setSuccess('User added successfully!');
      }

      fetchUsers();
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      console.error(err);
      setError('Failed to save user. Please try again.');
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <div className="user-form-container">
      <h2>{id ? 'Edit User' : 'Add User'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="street" placeholder="Street" value={form.street} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="zipcode" placeholder="Zipcode" value={form.zipcode} onChange={handleChange} />
        <input name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} />
        <input name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} />
        <button type="submit">{id ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
