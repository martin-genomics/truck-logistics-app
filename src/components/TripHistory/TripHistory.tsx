// components/TripHistory.tsx
import React from 'react';
import { ChevronRight, Calendar, MapPin, Clock, Truck } from 'lucide-react';
import type { RouteData } from '@/types';
import SpotlightCard from '../SpotlightCard';

interface TripHistoryProps {
  trips: RouteData[];
  onSelectTrip: (trip: RouteData) => void;
  selectedTripId?: string;
}

const TripHistory: React.FC<TripHistoryProps> = ({ trips, onSelectTrip, selectedTripId }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    return `${hours.toFixed(1)}h`;
  };

  if (trips.length === 0) {
    return (
      <div className=" rounded-xl shadow-sm border border-gray-200 p-6 w-full lg:w-[50%]">
        <div className="text-center text-gray-500">
          <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No trips yet</h3>
          <p className="text-sm">Your trip history will appear here</p>
        </div>
      </div>
    );
  }

  return (

    <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full lg:w-[50%" spotlightColor="rgba(0, 229, 255, 0.2)">
    
      {/* Header */}
      <div className="border-b border-teal-200  px-6 py-4">
        <h2 className="text-lg font-semibold  flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-teal-500" />
          Trip History
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          {trips.length} trip{trips.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      {/* Scrollable Trip List */}
      <div className="overflow-y-auto max-h-96">
        <div className="divid">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:bg-teal-500/10 ${
                selectedTripId === trip.id ? 'bg-teal-500/10 border-l-4 border-l-teal-600' : ''
              }`}
              onClick={() => onSelectTrip(trip)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Trip Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white bg-teal-500 px-2 py-1 rounded-full">
                      {formatDate(trip.created_at)}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-500 text-white">
                      {trip.estimated_days} day{trip.estimated_days !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Route Info */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      <span className="font-medium">From:</span>
                      <span className="ml-1 truncate">{trip.pickup_location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-1 text-teal-500" />
                      <span className="font-medium">To:</span>
                      <span className="ml-1 truncate">{trip.dropoff_location}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2  rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Distance</div>
                      <div className="text-sm font-semibold text-gray-400">
                        {trip.total_distance_miles.toFixed(0)} mi
                      </div>
                    </div>
                    <div className="text-center p-2  rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Drive Time</div>
                      <div className="text-sm font-semibold text-gray-400">
                        {formatTime(trip.total_drive_hours)}
                      </div>
                    </div>
                    <div className="text-center p-2  rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Stops</div>
                      <div className="text-sm font-semibold text-gray-400">
                        {trip.stops.length}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((trip.current_cycle_hours / 70) * 100)}% of cycle</span>
                    </div>
                    <div className="w-full  rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((trip.current_cycle_hours / 70) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Time Info */}
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Created {new Date(trip.created_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Chevron Icon */}
                <ChevronRight className={`w-5 h-5 text-gray-400 ml-4 flex-shrink-0 ${
                  selectedTripId === trip.id ? 'text-blue-600' : ''
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200  px-6 py-3">
        <p className="text-xs text-gray-500 text-center">
          Showing {trips.length} most recent trips
        </p>
      </div>
    
    </SpotlightCard>
  );
};

export default TripHistory;