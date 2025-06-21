import React from 'react';

function VehicleCard({ vehicle, ratings, handleRatingChange, submitRating, averageRating, getRatingComment, getRatingColor }) {
  return (
    <div className="col" key={vehicle.id}>
      <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="card-body">
          <h5 className="card-title text-light">
            {vehicle.brand} {vehicle.model}
          </h5>
          <p className="card-text text-light">
            <strong>Type:</strong> {vehicle.type} <br />
            <strong>Year:</strong> {vehicle.year} <br />
            <strong>Average Rating:</strong>{" "}
            <span style={{ 
              color: getRatingColor(averageRating(vehicle)),
              fontWeight: 'bold'
            }}>
              {averageRating(vehicle)}
            </span>{" "}
            <span className="text-light opacity-75">
              {getRatingComment(averageRating(vehicle))}
            </span>
          </p>

          {/* Rating Input Form */}
          <div className="mt-4">
            <h6 className="border-bottom pb-2 text-light" style={{ borderColor: '#404040' }}>Submit Your Rating</h6>
            <div className="row g-2 mb-3">
              {["performance", "comfort", "design", "valueForMoney"].map(
                (field) => (
                  <div className="col-6 col-md-3" key={field}>
                    <label className="form-label text-capitalize small text-light">
                      {field === "valueForMoney"
                        ? "Value for Money"
                        : field}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control form-control-sm"
                      style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
                      value={ratings[vehicle.id]?.[field] || ""}
                      onChange={(e) =>
                        handleRatingChange(
                          vehicle.id,
                          field,
                          e.target.value
                        )
                      }
                      placeholder="1-5"
                    />
                  </div>
                )
              )}
            </div>
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: '#5865F2', borderColor: '#5865F2' }}
              onClick={() => submitRating(vehicle.id)}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard; 