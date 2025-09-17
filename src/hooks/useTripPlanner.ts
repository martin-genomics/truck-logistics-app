import { useState, useCallback } from 'react';
import type { TripData } from '../types/trip';

interface TripFormData {
  origin: string;
  destination: string;
  currentLocation: string;
  cycleHours: number;
}

const useTripPlanner = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = useCallback(async (formData: TripFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const mockTripData: TripData = await new Promise(resolve => {
        setTimeout(() => resolve({
          id: '1',
          origin: formData.origin,
          destination: formData.destination,
          totalDistance: 1200,
          totalDuration: 18 * 60, // minutes
          estimatedDays: 2,
          stops: [
            {
              id: '1',
              type: 'pickup',
              name: formData.origin,
              coordinates: { lat: 40.7128, lng: -74.0060 },
              duration: 30,
              arrivalTime: '08:00 AM',
              departureTime: '08:30 AM'
            },
            {
              id: '2',
              type: 'dropoff',
              name: formData.destination,
              coordinates: { lat: 34.0522, lng: -118.2437 },
              duration: 0,
              arrivalTime: '05:00 PM',
              departureTime: '05:00 PM'
            }
          ],
          route: [],
          schedule: [
            {
              date: new Date().toISOString(),
              driving: 11 * 60,
              onDuty: 12 * 60,
              offDuty: 12 * 60,
              segments: []
            }
          ],
          logSheet: { days: [] }
        }), 1000);
      });
      
      setTripData(mockTripData);
      return mockTripData;
    } catch (err) {
      setError('Failed to calculate route. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetTrip = useCallback(() => {
    setTripData(null);
    setError(null);
  }, []);

  return {
    tripData,
    loading,
    error,
    calculateRoute,
    resetTrip
  };
};

export default useTripPlanner;
