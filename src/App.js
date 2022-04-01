import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// screens
import SendRepair from './screens/SendRepair';
// components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index       element={<Home />}/>
        <Route path="/repair" element={<SendRepair />}/>
        <Route path="/*"       element={<Navigate to="/" replace />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
