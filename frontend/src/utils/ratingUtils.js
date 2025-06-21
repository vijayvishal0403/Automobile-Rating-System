export function averageRating(vehicle) {
  if (!vehicle.ratings || vehicle.ratings.length === 0) return "-";
  const total = vehicle.ratings.reduce(
    (acc, r) =>
      acc + (r.performance + r.comfort + r.design + r.valueForMoney) / 4,
    0
  );
  return (total / vehicle.ratings.length).toFixed(1);
}

export function getRatingComment(rating) {
  if (rating === "-") return "(No users have reviewed this vehicle yet)";
  const numRating = parseFloat(rating);
  if (numRating >= 4.5) return "(Exceptional vehicle, highly recommended!)";
  if (numRating >= 4.0) return "(Users highly recommend this vehicle)";
  if (numRating >= 3.5) return "(Good vehicle with positive reviews)";
  if (numRating >= 3.0) return "(Decent vehicle with mixed reviews)";
  if (numRating >= 2.5) return "(Average vehicle with some concerns)";
  if (numRating >= 2.0) return "(Below average, consider alternatives)";
  return "(Poor ratings, not recommended)";
}

export function getRatingColor(rating) {
  if (rating === "-") return "#ffffff";
  const numRating = parseFloat(rating);
  if (numRating >= 4.0) return "#4CAF50"; // Green
  if (numRating >= 3.0) return "#FFC107"; // Yellow
  if (numRating >= 2.0) return "#FF9800"; // Orange
  return "#F44336"; // Red
} 