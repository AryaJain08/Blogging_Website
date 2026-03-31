import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">LuminaBlog.</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <>
                            <Link to="/create" className="nav-link">Write a Story</Link>
                            <span className="nav-link" style={{ color: 'var(--text-main)' }}>Hi, {user.username}</span>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Log in</Link>
                            <Link to="/register" className="btn btn-primary">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
