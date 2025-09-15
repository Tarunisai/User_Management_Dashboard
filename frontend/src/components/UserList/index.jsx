import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../api/userService';
import './index.css'

function UserList({ users, fetchUsers }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="user-cards">
      {users.map(user => (
        <div
          key={user.id}
          className="user-card"
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Company: {user.company}</p>
          <p>City: {user.city}</p>
          <p>Zipcode: {user.zipcode}</p>
          <p>Latitude: {user.lat}</p>
          <p>Longitude: {user.lng}</p>

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => navigate(`/users/${user.id}`)}>Details</button>
            <button onClick={() => navigate(`/edit-user/${user.id}`)} style={{ marginLeft: '5px' }}>Edit</button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '5px' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;