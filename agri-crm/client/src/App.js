import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import FarmerForm from './components/FarmerForm';
import FarmerView from './components/FarmerView';
import Login from './pages/Login';
import Crops from './pages/Crops';
import Reports from './pages/Reports';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/farmers" element={<Layout><Farmers /></Layout>} />
      <Route path="/farmers/new" element={<Layout><FarmerForm /></Layout>} />
      <Route path="/farmers/:id" element={<Layout><FarmerForm /></Layout>} />
      <Route path="/farmers/view/:id" element={<Layout><FarmerView /></Layout>} />
      <Route path="/crops" element={<Layout><Crops /></Layout>} />
      <Route path="/reports" element={<Layout><Reports /></Layout>} />
    </Routes>
  );
}

export default App;
