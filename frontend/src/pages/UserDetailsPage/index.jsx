import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'https://user-management-dashboard-os2g.onrender.com/api/users';

function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        if (res.data && res.data.data) setUser(res.data.data); // access .data.data
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company}</p>
      <h3>Address</h3>
      <p>Street: {user.street}</p>
      <p>City: {user.city}</p>
      <p>Zipcode: {user.zipcode}</p>
      <h3>Geo Location</h3>
      <p>Latitude: {user.lat}</p>
      <p>Longitude: {user.lng}</p>
      <button className="user-details-back" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default UserDetailsPage;
