import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuctionList from './pages/AuctionsList';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<AuctionList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/create" element={<CreateAuction />} />
         <Route path="/auctions" element={<AuctionList />} />
      </Routes>
    </Router>
  );
}
