import React from 'react';

const VEHICLE_TYPES = ["Sedan", "SUV", "Hatchback", "Electric"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Highest Rating", value: "highestRating" },
];

function FilterSection({ filters, setFilters, brands }) {
  return (
    <div className="card shadow-sm mb-4 border-0" style={{ backgroundColor: '#2d2d2d' }}>
      <div className="card-header" style={{ backgroundColor: '#363636', borderBottom: '1px solid #404040' }}>
        <h5 className="mb-0 text-light">Filters & Sorting</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Vehicle Type</label>
            <select
              className="form-select"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={filters.type}
              onChange={(e) =>
                setFilters((f) => ({ ...f, type: e.target.value }))
              }
            >
              <option value="">All</option>
              {VEHICLE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Brand</label>
            <select
              className="form-select"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={filters.brand}
              onChange={(e) =>
                setFilters((f) => ({ ...f, brand: e.target.value }))
              }
            >
              <option value="">All</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <label className="form-label fw-bold text-light">Year</label>
            <input
              type="number"
              className="form-control"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={filters.year}
              onChange={(e) =>
                setFilters((f) => ({ ...f, year: e.target.value }))
              }
              placeholder="Year"
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label fw-bold text-light">Sort By</label>
            <select
              className="form-select"
              style={{ backgroundColor: '#363636', borderColor: '#404040', color: '#ffffff' }}
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sortBy: e.target.value }))
              }
            >
              <option value="">None</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-1 d-flex align-items-end">
            <button
              className="btn btn-outline-light w-100"
              onClick={() =>
                setFilters({ type: "", brand: "", year: "", sortBy: "" })
              }
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSection; 