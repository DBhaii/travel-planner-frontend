// src/App.jsx
import { Flex, Box } from '@chakra-ui/react'; // Added 'Box' here
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// Import all your new pages
import HomePage from './pages/HomePage';
import VisaPage from './pages/VisaPage';
import TransportPage from './pages/TransportPage';
import DosAndDontsPage from './pages/DosAndDontsPage';

import './index.css';

function App() {
  return (
    <Router>
      <Flex direction="column" minHeight="100vh" bg="slate.100">
        <Navbar />
        <Box flex="1" className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/visa" element={<VisaPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/dos-and-donts" element={<DosAndDontsPage />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;