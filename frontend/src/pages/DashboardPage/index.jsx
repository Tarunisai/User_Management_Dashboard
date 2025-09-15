import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/UserList';
import './index.css'

function DashboardPage() {
  const { users, fetchUsers } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      {/* Add User Button */}
      <button className="add-user-bt" onClick={() => navigate('/add-user')}>
        Add User
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* User List Component */}
      <UserList users={filteredUsers} fetchUsers={fetchUsers} />
    </div>
  );
}

export default DashboardPage;