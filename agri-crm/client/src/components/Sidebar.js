import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/farmers" 
              className={({isActive}) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`
              }
            >
              Farmers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/crops" 
              className={({isActive}) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`
              }
            >
              Crops
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/reports" 
              className={({isActive}) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`
              }
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;