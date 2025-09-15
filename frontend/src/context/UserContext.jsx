import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://user-management-dashboard-os2g.onrender.com/api/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); 

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setUsers([]); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
