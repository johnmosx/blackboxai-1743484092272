import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import FarmerForm from './components/FarmerForm';
import FarmerView from './components/FarmerView';
import Login from './pages/Login';
import Crops from './pages/Crops';
import Reports from './pages/Reports';
import Users from './pages/Users';
import RoleBasedRoute from './components/RoleBasedRoute';
import Profile from './pages/Profile';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import '@ant-design/v5-patch-for-react-19';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/farmers" element={<Layout><Farmers /></Layout>} />
          <Route path="/farmers/new" element={<Layout><FarmerForm /></Layout>} />
          <Route path="/farmers/:id" element={<Layout><FarmerForm /></Layout>} />
          <Route path="/farmers/view/:id" element={<Layout><FarmerView /></Layout>} />
          <Route path="/crops" element={<Layout><Crops /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/users" element={
            <Layout>
              <RoleBasedRoute allowedRoles={['Administrator']}>
                <Users />
              </RoleBasedRoute>
            </Layout>
          } />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;