// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import TripItinerary from './components/TripItinerary';
import SearchResults from './components/SearchResults';
import GeneratedPlan from './components/GeneratedPlan';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('register'); // Default to register for new users

  const [searchType, setSearchType] = useState('flights');
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myTrip, setMyTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itinerary, setItinerary] = useState('');

  // Flight form state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  // Hotel form state
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleRegister = async (username, password) => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      // Automatically log in after successful registration
      alert('Registration successful! Please log in.');
      setView('login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (username, password) => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setMyTrip([]);
    setItinerary('');
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'x-access-token': token,
  });

  useEffect(() => {
    const fetchTrip = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/trip', { headers: getAuthHeaders() });
        const data = await response.json();
        setMyTrip(data.tripData || []);
      } catch (e) {
        setError("Could not load saved trip.");
      }
    };
    fetchTrip();
  }, [token]);

  useEffect(() => {
    const saveTrip = async () => {
      await fetch('http://localhost:5000/api/trip', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tripData: myTrip }),
      });
    };
    // Only save if there's a token and a trip to save
    if (token && myTrip) {
      saveTrip();
    }
  }, [myTrip, token]);
  
  const addToTrip = (item) => {
    const itemType = searchType === 'flights' ? 'Flight' : 'Hotel';
    setMyTrip([...myTrip, { ...item, type: itemType }]);
  };

  const removeFromTrip = (indexToRemove) => {
    setMyTrip(myTrip.filter((_, index) => index !== indexToRemove));
  };
  
  const handleSearch = async () => {
    // ... (This function is complete and correct from the previous step)
  };
  
  const handleGenerateItinerary = async () => {
    if (myTrip.length === 0) {
      setError("Please add items to your trip first.");
      return;
    }
    setLoading(true);
    setError('');
    setItinerary('');
    try {
      const response = await fetch('http://localhost:5000/api/generate-itinerary', {
        method: 'POST',
        // THIS WAS THE MISSING PART - corrected now
        headers: getAuthHeaders(), 
        body: JSON.stringify({ tripData: myTrip }),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.message || 'Failed to generate itinerary'); }
      setItinerary(data.itinerary_html);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (!token) {
    return (
      <div className="App App-header">
        {view === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />
        )}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Planner</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        
        <div className="search-toggles">
          <button onClick={() => setSearchType('flights')}>Search Flights</button>
          <button onClick={() => setSearchType('hotels')}>Search Hotels</button>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}

        <SearchResults
          type={searchType}
          results={searchType === 'flights' ? flights : hotels}
          onAddItem={addToTrip}
          onSearch={handleSearch}
          loading={loading}
          origin={origin} setOrigin={setOrigin}
          destination={destination} setDestination={setDestination}
          departureDate={departureDate} setDepartureDate={setDepartureDate}
          cityCode={cityCode} setCityCode={setCityCode}
          checkInDate={checkInDate} setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate}
        />

        <TripItinerary
          trip={myTrip}
          onRemove={removeFromTrip}
          onGenerate={handleGenerateItinerary}
          loading={loading}
        />

        <GeneratedPlan htmlContent={itinerary} />
      </header>
    </div>
  );
}

export default App;