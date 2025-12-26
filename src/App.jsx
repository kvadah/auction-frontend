import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VerifyEmailPage from './pages/EmailVerify';
import AuctionList from './pages/auctions/AuctionsList';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/create" element={<CreateAuction />} />
        <Route path="/auctions" element={<AuctionList />} />
      </Routes>
    </Router>
  );
}
