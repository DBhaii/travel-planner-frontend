// src/components/TripItinerary.jsx
export default function TripItinerary({ trip, onRemove, onGenerate, loading }) {
  return (
    <div className="trip-container">
      <h2>My Trip</h2>
      {trip.length === 0 ? (
        <p>Your trip is empty. Add items from the search results.</p>
      ) : (
        trip.map((item, index) => (
          <div key={index} className="trip-item-card">
            <span>
              <strong>{item.type}:</strong> {item.name || `Price: ${item.price.total}`}
            </span>
            <button onClick={() => onRemove(index)} className="remove-btn">
              Remove
            </button>
          </div>
        ))
      )}
      <button
        onClick={onGenerate}
        disabled={loading || trip.length === 0}
        className="generate-btn"
      >
        {loading ? 'Generating...' : '✨ Generate AI Itinerary'}
      </button>
    </div>
  );
}