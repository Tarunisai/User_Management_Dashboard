import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../api/userService';
import './index.css';

function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-details-container">
      
      <h1>User Details</h1>
      <p>Name:{user.name}</p>
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
