// components/TripSummary.tsx
import React from 'react';

interface TripSummaryProps {
  total_distance: number;
  total_drive_hours: number;
  estimated_days: number;
}

const TripSummary: React.FC<TripSummaryProps> = ({
  total_distance,
  total_drive_hours,
  estimated_days
}) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-blue-600">Total Distance</p>
          <p className="text-2xl font-bold">{total_distance} miles</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-sm text-orange-600">Total Drive Hours</p>
          <p className="text-2xl font-bold">{total_drive_hours} hours</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-sm text-green-600">Estimated Days</p>
          <p className="text-2xl font-bold">{estimated_days} days</p>
        </div>
      </div>
    </section>
  );
};

export default TripSummary;