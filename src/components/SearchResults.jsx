// src/components/SearchResults.jsx

export default function SearchResults({
  type,
  results,
  onAddItem,
  onSearch,
  loading,
  // Flight form props
  origin, setOrigin,
  destination, setDestination,
  departureDate, setDepartureDate,
  // Hotel form props
  cityCode, setCityCode,
  checkInDate, setCheckInDate,
  checkOutDate, setCheckOutDate
}) {
  const isFlights = type === 'flights';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div>
      <h2>{isFlights ? 'Flight' : 'Hotel'} Search</h2>
      
      <form onSubmit={handleSubmit} className="search-form">
        {isFlights ? (
          <>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin IATA (e.g., BOM)" required />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination IATA (e.g., DEL)" required />
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
          </>
        ) : (
          <>
            <input type="text" value={cityCode} onChange={(e) => setCityCode(e.target.value)} placeholder="City Code (e.g., PAR)" required />
            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
          </>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : `Search ${isFlights ? 'Flights' : 'Hotels'}`}
        </button>
      </form>

      <div className="results-container">
        {results.map(item => (
          <div key={item.id || item.hotelId} className="result-card">
            <h3>{isFlights ? `Price: ${item.price.total} ${item.price.currency}` : item.name}</h3>
            <button onClick={() => onAddItem(item)}>Add to Trip</button>
          </div>
        ))}
      </div>
    </div>
  );
}