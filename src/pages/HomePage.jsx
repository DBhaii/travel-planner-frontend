import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, BedDouble, Plane, Palmtree, Wand2 } from "lucide-react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// This component receives the auth token and logout function as props
export default function HomePage({ token, handleLogout }) {
  const API_URL = 'http://localhost:5000';

  // All component state is managed here
  const [activeSearch, setActiveSearch] = useState('flights');
  const [query, setQuery] = useState({
    origin: '', destination: '', departureDate: '',
    cityCode: '', checkInDate: '', checkOutDate: '',
    activityKeyword: '',
  });

  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [myTrip, setMyTrip] = useState([]);
  const [itinerary, setItinerary] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [destinationCity, setDestinationCity] = useState("");

  // Helper to create authenticated headers for API calls
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'x-access-token': token,
  });

  // Load the user's saved trip from the database when the page loads
  useEffect(() => {
    const fetchTrip = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/api/trip`, { headers: getAuthHeaders() });
        const data = await response.json();
        setMyTrip(data.tripData || []);
      } catch (e) {
        setError("Could not load saved trip.");
      }
    };
    fetchTrip();
  }, [token]);

  // Save the trip to the database whenever it changes
  useEffect(() => {
    const saveTrip = async () => {
      // Avoid saving an empty trip if the initial load is empty
      if (myTrip === null || myTrip === undefined) return;
      await fetch(`${API_URL}/api/trip`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tripData: myTrip }),
      });
    };
    saveTrip();
  }, [myTrip, token]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevQuery => ({ ...prevQuery, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultsOpen(true);
    setFlights([]);
    setHotels([]);
    setActivities([]);

    if (activeSearch === 'flights') setDestinationCity(query.destination);
    if (activeSearch === 'hotels') setDestinationCity(query.cityCode);
    if (activeSearch === 'activities') setDestinationCity(query.activityKeyword);

    let endpoint = '';
    let params;

    if (activeSearch === 'flights') {
      endpoint = '/api/search-flights';
      params = new URLSearchParams({ origin: query.origin, destination: query.destination, departureDate: query.departureDate });
    } else if (activeSearch === 'hotels') {
      endpoint = '/api/search-hotels';
      params = new URLSearchParams({ cityCode: query.cityCode, checkInDate: query.checkInDate, checkOutDate: query.checkOutDate });
    } else if (activeSearch === 'activities') {
      endpoint = '/api/search-activities';
      params = new URLSearchParams({ keyword: query.activityKeyword });
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}?${params}`); // Search APIs can be public
      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data.details || data.error));
      }
      if (activeSearch === 'flights') setFlights(data.data || []);
      else if (activeSearch === 'hotels') setHotels(data.data || []);
      else if (activeSearch === 'activities') setActivities(data.data || []);
    } catch (err) {
      console.error(err);
      setError(`Failed to fetch ${activeSearch}. Check parameters or try again later.`);
    } finally {
      setLoading(false);
    }
  };

  const addToTrip = (item, type) => {
    setMyTrip([...myTrip, { ...item, type }]);
  };

  const removeFromTrip = (indexToRemove) => {
    setMyTrip(myTrip.filter((_, index) => index !== indexToRemove));
  };

  const handleGenerateItinerary = async () => {
    if (myTrip.length === 0) return;
    setLoading(true);
    setError('');
    setItinerary('');
    try {
      const response = await fetch(`${API_URL}/api/generate-itinerary`, {
        method: 'POST',
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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6 md:p-12 font-sans">
      <header className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">TP</div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">Trip Planner</h1>
              <p className="text-xs text-slate-500">Flights · Hotels · Activities · Local tips</p>
            </div>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Logout</button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg sticky top-6 h-fit">
          <div className="flex border-b mb-4">
            <button onClick={() => setActiveSearch('flights')} className={`flex-1 py-2 font-semibold flex items-center justify-center gap-2 ${activeSearch === 'flights' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>
              <Plane size={16} /> Flights
            </button>
            <button onClick={() => setActiveSearch('hotels')} className={`flex-1 py-2 font-semibold flex items-center justify-center gap-2 ${activeSearch === 'hotels' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>
              <BedDouble size={16} /> Hotels
            </button>
            <button onClick={() => setActiveSearch('activities')} className={`flex-1 py-2 font-semibold flex items-center justify-center gap-2 ${activeSearch === 'activities' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>
              <Palmtree size={16} /> Activities
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {activeSearch === 'flights' && (
              <>
                <label className="block"><span className="text-sm font-medium text-slate-700">Origin (IATA)</span><input name="origin" value={query.origin} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" placeholder="e.g., BOM" required /></label>
                <label className="block"><span className="text-sm font-medium text-slate-700">Destination (IATA)</span><input name="destination" value={query.destination} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" placeholder="e.g., DEL" required /></label>
                <label className="block"><span className="text-sm font-medium text-slate-700">Departure Date</span><input type="date" name="departureDate" value={query.departureDate} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" required /></label>
              </>
            )}
            {activeSearch === 'hotels' && (
              <>
                <label className="block"><span className="text-sm font-medium text-slate-700">City Code (IATA)</span><input name="cityCode" value={query.cityCode} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" placeholder="e.g., PAR for Paris" required /></label>
                <label className="block"><span className="text-sm font-medium text-slate-700">Check-in Date</span><input type="date" name="checkInDate" value={query.checkInDate} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" required /></label>
                <label className="block"><span className="text-sm font-medium text-slate-700">Check-out Date</span><input type="date" name="checkOutDate" value={query.checkOutDate} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" required /></label>
              </>
            )}
            {activeSearch === 'activities' && (
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Search by city</span>
                <input name="activityKeyword" value={query.activityKeyword} onChange={handleInputChange} className="w-full rounded-lg border p-3 mt-1" placeholder="e.g., Rome" required />
              </label>
            )}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 flex items-center justify-center disabled:bg-indigo-400">
              {loading ? <LoaderCircle className="animate-spin" /> : `Search ${activeSearch.charAt(0).toUpperCase() + activeSearch.slice(1)}`}
            </button>
          </form>
        </section>
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              {!resultsOpen ? (
                <div className="text-slate-500 py-12 text-center">
                  <h2 className="text-lg font-semibold">Plan your next trip</h2>
                  <p className="text-sm">Select a search type and enter details to see results.</p>
                </div>
              ) : (
                <Tabs isFitted variant="soft-rounded" colorScheme="indigo">
                  <TabList mb="1em">
                    <Tab>Flights ({flights.length})</Tab>
                    <Tab>Stays ({hotels.length})</Tab>
                    <Tab>Activities ({activities.length})</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {loading && activeSearch === 'flights' && <div className="flex justify-center items-center py-12"><LoaderCircle size={32} className="animate-spin text-indigo-600" /></div>}
                      {error && activeSearch === 'flights' && <p className="text-red-500 text-center">{error}</p>}
                      {!loading && !error && flights.length === 0 && <p className="text-slate-500 text-center py-12">No flights found.</p>}
                      <div className="space-y-4">
                        {flights.map((flight) => (
                          <motion.div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border rounded-xl flex items-center justify-between">
                             <div>
                              <div className="font-semibold">{flight.itineraries[0].segments.map(seg => seg.carrierCode + ' ' + seg.aircraft.code).join(' → ')}</div>
                              <div className="text-xs text-slate-500">Duration: {flight.itineraries[0].duration.replace('PT','').replace('H','h ').replace('M','m')}</div>
                            </div>
                            <div className="text-right">
                               <div className="font-bold text-lg text-indigo-600">€{flight.price.total}</div>
                             </div>
                             <button onClick={() => addToTrip(flight, 'Flight')} className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200">Add</button>
                          </motion.div>
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      {loading && activeSearch === 'hotels' && <div className="flex justify-center items-center py-12"><LoaderCircle size={32} className="animate-spin text-indigo-600" /></div>}
                      {error && activeSearch === 'hotels' && <p className="text-red-500 text-center">{error}</p>}
                      {!loading && !error && hotels.length === 0 && <p className="text-slate-500 text-center py-12">No hotels found.</p>}
                      <div className="space-y-4">
                        {hotels.map((hotel) => (
                          <motion.div key={hotel.hotelId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border rounded-xl flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{hotel.name}</h3>
                              <p className="text-sm text-slate-600">Chain: {hotel.chainCode} | Rating: {hotel.rating} stars</p>
                            </div>
                            <button onClick={() => addToTrip(hotel, 'Hotel')} className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200">Add</button>
                          </motion.div>
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                       {loading && activeSearch === 'activities' && <div className="flex justify-center items-center py-12"><LoaderCircle size={32} className="animate-spin text-indigo-600" /></div>}
                       {error && activeSearch === 'activities' && <p className="text-red-500 text-center">{error}</p>}
                       {!loading && !error && activities.length === 0 && <p className="text-slate-500 text-center py-12">No activities found.</p>}
                       <div className="space-y-4">
                        {activities.map((activity) => (
                          <motion.div key={activity.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border rounded-xl flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{activity.name}</h3>
                              <p className="text-sm text-slate-600">Category: {activity.subType}</p>
                            </div>
                             <button onClick={() => addToTrip(activity, 'Activity')} className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200">Add</button>
                          </motion.div>
                        ))}
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              )}
            </div>
          </section>
          <section>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">My Trip Itinerary</h2>
              <div className="space-y-3 mb-4">
                {myTrip.length === 0 ? (
                  <p className="text-sm text-slate-500">Your trip is empty. Add items from the search results above.</p>
                ) : (
                  myTrip.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-semibold">{item.type}:</span> {item.name || `Flight to ${item.itineraries[0].segments[0].arrival.iataCode}`}
                      </div>
                      <button onClick={() => removeFromTrip(index)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))
                )}
              </div>
              <button onClick={handleGenerateItinerary} disabled={loading || myTrip.length === 0} className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 flex items-center justify-center gap-2 disabled:bg-purple-400">
                {loading && itinerary ? <LoaderCircle className="animate-spin" /> : <><Wand2 size={16} /> Generate AI Itinerary</>}
              </button>
              {itinerary && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-md font-semibold mb-2">Your AI-Powered Plan</h3>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: itinerary }} />
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}