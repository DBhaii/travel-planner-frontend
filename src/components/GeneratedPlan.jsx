// src/components/GeneratedPlan.jsx
export default function GeneratedPlan({ htmlContent }) {
  if (!htmlContent) return null;

  return (
    <div className="itinerary-container">
      <h2>Your AI-Powered Itinerary</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}