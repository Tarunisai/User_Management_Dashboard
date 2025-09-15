import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserForm from './components/UserForm';
import { UserProvider } from './context/UserContext'; 

function App() {
  return (
    <UserProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
