import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Home, Zap, TrendingUp, Cloud, Truck, Building, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <Zap size={24} />
          <span>OilChain</span>
        </Link>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/dashboard"><Home size={18} /> Dashboard</Link></li>
          <li><Link to="/profile"><Zap size={18} /> My Profile</Link></li>
          <li><Link to="/prices"><TrendingUp size={18} /> Price Forecast</Link></li>
          <li><Link to="/weather"><Cloud size={18} /> Weather</Link></li>
          <li><Link to="/logistics"><Truck size={18} /> Logistics</Link></li>
          <li><Link to="/marketplace"><ShoppingCart size={18} /> Marketplace</Link></li>
          <li><Link to="/warehouses"><Building size={18} /> Warehouses</Link></li>
          <li className="user-section">
            <span className="username">{user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
