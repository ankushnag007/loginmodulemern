import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login.jsx';
import Dashboard from './component/dashboard.jsx';

function App() {
const userData = localStorage.getItem("userData")
console.log(userData, "localdata in aps");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />: 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;