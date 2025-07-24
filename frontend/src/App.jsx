import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login.jsx';
import Dashboard from './component/dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;