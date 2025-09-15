import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; 
import './index.css';

const API_URL = 'https://user-management-dashboard-os2g.onrender.com/api/users';

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

  // Fetch existing user if editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        if (res.data && res.data.data) {
          setForm(res.data.data); // important: access .data.data
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user data.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async e => {
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
        await axios.put(`${API_URL}/${id}`, form);
        setSuccess('User updated successfully!');
      } else {
        await axios.post(API_URL, form);
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
        {Object.keys(form).map(key => (
          <input
            key={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">{id ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
