import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVehicleForm from "./components/AddVehicleForm";
import FilterSection from "./components/FilterSection";
import VehicleCard from "./components/VehicleCard";
import { averageRating, getRatingComment, getRatingColor } from "./utils/ratingUtils";

const VEHICLE_TYPES = ["Sedan", "SUV", "Hatchback", "Electric"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Highest Rating", value: "highestRating" },
];

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
    year: "",
    sortBy: "",
  });
  const [brands, setBrands] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    type: "",
    brand: "",
    model: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  async function fetchVehicles() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/api/vehicles");
      console.log("vehicles API response.data:", response.data);

      let vehiclesArray = [];
      if (Array.isArray(response.data)) {
        vehiclesArray = response.data;
      } else if (Array.isArray(response.data.vehicles)) {
        vehiclesArray = response.data.vehicles;
      } else {
        setError("Unexpected response from server.");
        setVehicles([]);
        setBrands([]);
        setRatings({});
        return;
      }

      // Apply filters
      let filteredVehicles = vehiclesArray;
      
      if (filters.type) {
        filteredVehicles = filteredVehicles.filter(v => v.type === filters.type);
      }
      if (filters.brand) {
        filteredVehicles = filteredVehicles.filter(v => v.brand === filters.brand);
      }
      if (filters.year) {
        filteredVehicles = filteredVehicles.filter(v => v.year === parseInt(filters.year));
      }

      // Apply sorting
      if (filters.sortBy) {
        filteredVehicles = [...filteredVehicles].sort((a, b) => {
          switch (filters.sortBy) {
            case "newest":
              return b.year - a.year;
            case "highestRating":
              const ratingA = averageRating(a);
              const ratingB = averageRating(b);
              return ratingB === "-" ? -1 : ratingA === "-" ? 1 : ratingB - ratingA;
            default:
              return 0;
          }
        });
      }

      setVehicles(filteredVehicles);

      const uniqueBrands = [
        ...new Set(vehiclesArray.map((v) => v.brand).filter(Boolean)),
      ];
      setBrands(uniqueBrands);

      const newRatingsState = {};
      vehiclesArray.forEach((v) => {
        newRatingsState[v.id] = {
          performance: "",
          comfort: "",
          design: "",
          valueForMoney: "",
        };
      });
      setRatings(newRatingsState);
    } catch (err) {
      setError("Failed to fetch vehicles.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddVehicle(e) {
    e.preventDefault();
    setError("");

    if (
      !newVehicle.type ||
      !newVehicle.brand ||
      !newVehicle.model ||
      !newVehicle.year
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/vehicles", {
        ...newVehicle,
        year: parseInt(newVehicle.year, 10),
      });
      setNewVehicle({ type: "", brand: "", model: "", year: "" });
      fetchVehicles();
    } catch (err) {
      if (err.response?.status === 409) {
        setError(`A vehicle with type "${newVehicle.type}", brand "${newVehicle.brand}", and model "${newVehicle.model}" already exists.`);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add vehicle. Please try again.");
      }
      console.error(err);
    }
  }

  const handleRatingChange = (vehicleId, field, value) => {
    setRatings((prev) => ({
      ...prev,
      [vehicleId]: {
        ...prev[vehicleId],
        [field]: value,
      },
    }));
  };

  const submitRating = async (vehicleId) => {
    const ratingData = ratings[vehicleId];

    if (
      !ratingData.performance ||
      !ratingData.comfort ||
      !ratingData.design ||
      !ratingData.valueForMoney
    ) {
      alert("Please fill all rating fields.");
      return;
    }
    const parsedData = {
      performance: parseInt(ratingData.performance, 10),
      comfort: parseInt(ratingData.comfort, 10),
      design: parseInt(ratingData.design, 10),
      valueForMoney: parseInt(ratingData.valueForMoney, 10),
    };
    for (const key in parsedData) {
      if (
        isNaN(parsedData[key]) ||
        parsedData[key] < 1 ||
        parsedData[key] > 5
      ) {
        alert("Ratings must be numbers between 1 and 5.");
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/ratings/${vehicleId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        }
      );
      if (!response.ok) {
        console.log(parsedData);
        throw new Error("Failed to submit rating.");
      }
      alert("Rating submitted successfully!");
      // Clear rating inputs for this vehicle
      setRatings((prev) => ({
        ...prev,
        [vehicleId]: {
          performance: "",
          comfort: "",
          design: "",
          valueForMoney: "",
        },
      }));
      fetchVehicles();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-5" style={{ backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
      <style>
        {`
          input::placeholder {
            color: #9ca3af !important;
            opacity: 0.7;
          }
          input::-webkit-input-placeholder {
            color: #9ca3af !important;
            opacity: 0.7;
          }
          input:-moz-placeholder {
            color: #9ca3af !important;
            opacity: 0.7;
          }
          input::-moz-placeholder {
            color: #9ca3af !important;
            opacity: 0.7;
          }
          input:-ms-input-placeholder {
            color: #9ca3af !important;
            opacity: 0.7;
          }
        `}
      </style>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="text-center mb-5 py-4 px-3 rounded-4" style={{ background: 'linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)' }}>
            <h1 className="display-5 fw-bold" style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              Automobile Rating System
            </h1>
            <p className="text-light mt-2 mb-0 opacity-75">Find and rate your favorite vehicles</p>
          </div>

          <AddVehicleForm
            newVehicle={newVehicle}
            handleInputChange={handleInputChange}
            handleAddVehicle={handleAddVehicle}
            error={error}
          />

          <FilterSection
            filters={filters}
            setFilters={setFilters}
            brands={brands}
          />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-light">Loading vehicles...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-light">No vehicles found.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  ratings={ratings}
                  handleRatingChange={handleRatingChange}
                  submitRating={submitRating}
                  averageRating={averageRating}
                  getRatingComment={getRatingComment}
                  getRatingColor={getRatingColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
