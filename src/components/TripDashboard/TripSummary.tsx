import React from 'react';
import { formatDistance, formatDuration } from '../../utils/formatters';
import SpotlightCard from '../SpotlightCard';

interface TripSummaryProps {
  origin: string;
  destination: string;
  totalDistance: number;
  totalDuration: number;
  estimatedDays: number;
}

const TripSummary: React.FC<TripSummaryProps> = ({
  origin,
  destination,
  totalDistance,
  totalDuration,
  estimatedDays
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Route Card */}
      <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-primary-500" spotlightColor="rgba(0, 229, 255, 0.2)">
    
     
        <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wider mb-2">Route</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">{origin}</p>
            <div className="flex items-center text-gray-300">
              <svg className="h-4 w-4 text-gray-200 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <p className="text-sm truncate">{destination}</p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
            <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
     
      </SpotlightCard>
      
      {/* Distance Card */}
      <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-primary-500" spotlightColor="rgba(0, 229, 255, 0.2)">
    
     
        <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wider">Distance</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-300">{formatDistance(totalDistance)}</p>
          <span className="ml-2 text-sm text-gray-200">miles</span>
        </div>
        <p className="mt-1 text-xs text-gray-200">Total distance</p>
   
      </SpotlightCard>
      
      {/* Duration Card */}
      <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-primary-500" spotlightColor="rgba(0, 229, 255, 0.2)">
    
     
        <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wider">Duration</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-300">{formatDuration(totalDuration)}</p>
          <span className="ml-2 text-sm text-gray-200">hours</span>
         </div>
        <p className="mt-1 text-xs text-gray-200">Total driving time</p>
      </SpotlightCard>
      
      {/* Estimated Days Card */}
      <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-primary-500" spotlightColor="rgba(0, 229, 255, 0.2)">
    
     
        <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wider">Estimated Trip</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-300">{estimatedDays}</p>
          <span className="ml-2 text-sm text-gray-200">{estimatedDays === 1 ? 'day' : 'days'}</span>
          </div>
        <p className="mt-1 text-xs text-gray-200">Estimated trip duration</p>
      </SpotlightCard>
    </div>
  );
};

export default TripSummary;
