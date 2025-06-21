import React from 'react';

const VEHICLE_TYPES = ["Sedan", "SUV", "Hatchback", "Electric"];

function AddVehicleForm({ newVehicle, handleInputChange, handleAddVehicle, error }) {
  return (
    <div className="card shadow-sm mb-4 border-0" style={{ backgroundColor: '#2d2d2d' }}>
      <div className="card-header" style={{ backgroundColor: '#363636', borderBottom: '1px solid #404040' }}>
        <h5 className="mb-0 text-light">Add New Vehicle</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleAddVehicle} className="row g-3">
          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Type</label>
            <select
              className="form-select"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              name="type"
              value={newVehicle.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              {VEHICLE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={newVehicle.brand}
              onChange={handleInputChange}
              placeholder="e.g., Toyota"
              required
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Model</label>
            <input
              type="text"
              name="model"
              className="form-control"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={newVehicle.model}
              onChange={handleInputChange}
              placeholder="e.g., Fortuner"
              required
            />
          </div>
          <div className="col-12 col-md-2">
            <label className="form-label fw-bold text-light">Year</label>
            <input
              type="number"
              name="year"
              className="form-control"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={newVehicle.year}
              onChange={handleInputChange}
              placeholder="2022"
              required
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>
          <div className="col-12 col-md-1 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#5865F2', borderColor: '#5865F2' }}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVehicleForm; 