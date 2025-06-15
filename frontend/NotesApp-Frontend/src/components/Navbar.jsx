import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#2196f3', padding: '1rem', color: 'white' }}>
      {user ? (
        <>
          <Link to="/notes" style={{ color: 'white', marginRight: '1rem' }}>NotesApp</Link>
          <button onClick={handleLogout} style={{ background: 'white', color: '#2196f3' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
          <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
