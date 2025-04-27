import { Routes, Route } from 'react-router-dom';
import JourneyPlanner from './pages/JourneyPlanner';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<JourneyPlanner />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;