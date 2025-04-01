import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import FarmerForm from './components/FarmerForm';
import FarmerView from './components/FarmerView';
import Crops from './pages/Crops';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmers/new" element={<FarmerForm />} />
          <Route path="farmers/:id" element={<FarmerForm />} />
          <Route path="farmers/view/:id" element={<FarmerView />} />
          <Route path="crops" element={<Crops />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
