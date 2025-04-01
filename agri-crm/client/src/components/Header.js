import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Agri-CRM
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-green-200">
            Profile
          </Link>
          <button className="hover:text-green-200">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;