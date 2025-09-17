// App.tsx
import React, { useState } from 'react';
import TripForm from './components/TripForm/TripForm';
import { type RouteData, type FormData, type LogEntry } from '@/types';
import DailySchedule from './components/TripDashboard/DailySchedule';
import LogSheet from './components/LogSheet/LogSheet';
import LoadingSpinner from './components/LoadingSpinner';
import RouteMap from './components/RouteMap/RouteMap';
import tripService from './api/tripService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TripSummary from './components/TripDashboard/TripSummary';
import TripHistory from './components/TripHistory/TripHistory';
import { Truck, Loader2 } from 'lucide-react';
import Header from './components/Header/Header';
import DotGrid from './components/DotGrid';



const App: React.FC = () => {
  const [tripData, setTripData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [LogEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [trips, setTrips] = useState<RouteData[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<RouteData | null>(null);
  const [open, setOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitLoading(true);
    setLoading(true);
    setError(null);
    
    try {

      // Call the trip service to create a new trip
      const response = await tripService.createTrip(formData);     
      if (response.success && response.data) {
        setTripData(response.data);
        toast.success('Trip plan generated successfully!');
        setOpen(false);
        setIsSubmitLoading(false);
      } else {
        throw new Error(response.message || 'Failed to generate trip plan');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate trip plan. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error generating trip:', err);
    } finally {
      setLoading(false);
      setIsSubmitLoading(false);
    }
  };

  const handleSelectTrip = (trip: RouteData) => {
    setSelectedTrip(trip);
    setTripData(trip);
  
  };
  
  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await tripService.getUserTrips();
        if (response.data && response.data.length > 0) {
          setTrips(response.data);
          setTripData(response.data[0]);
          setOpen(false);
          tripService.getTripDayLogs(response.data[0].id, 1).then((response) => {
            setLogEntries(response.data);
          }).catch((error) => {
            console.error('Error loading initial data:', error);
          });
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };
    
    loadInitialData();
  }, []);




  // Splash Screen Component
  const SplashScreen = () => (
    <>
    <div className="fixed inset-0 bg-amber-50/10 backdrop-blur-sm  flex flex-col items-center justify-center z-50">
      <div className="text-center p-8 max-w-md">
        <div className="animate-bounce mb-6">
          <Truck className="w-16 h-16 mx-auto text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ELD Trip Planner</h1>
        <p className="text-gray-600 mb-8">Loading your dashboard...</p>
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
      </div>
    </div>
    </>
  );

  // Show splash screen while initial data is loading
  if (loading && !tripData) {
    return <SplashScreen />;
  }

  return (
    <div 
      style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: 'black' }}
      className='overflow-hidden overflow-x-hidden '
      >
        <DotGrid
    dotSize={0.5}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
      <div 
        style={{
          scrollBehavior: 'smooth',
          scrollPaddingTop: '8rem',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
        className="fixed inset-0 z-50  mx-auto px-4 py-8 overflow-y-scroll">

        <Header onOpenChange={setOpen} />

        <main className='mt-8'>
          <TripForm onSubmit={handleFormSubmit} open={open} onOpenChange={setOpen} isLoading={isSubmitLoading} />
          
          {loading && <LoadingSpinner />}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              {error}
            </div>
          )}
          
          {tripData && (
            <div>
              <TripSummary 
                totalDistance={tripData.total_distance_miles}
                estimatedDays={tripData.estimated_days}
                origin={tripData.current_location}
                destination={tripData.dropoff_location}
                totalDuration={tripData.total_drive_hours}
              />
              
              <div className="flex flex-col  gap-8 mb-8 w-full">
                <RouteMap 
                  routeData={tripData}
                />
                
              </div>
              <div id='schedule' className='flex flex-col md:flex-row gap-8 mb-8'>
                <DailySchedule daily_schedules={tripData.daily_schedules} />
                <TripHistory
                  trips={trips}
                  onSelectTrip={handleSelectTrip}
                  selectedTripId={selectedTrip?.id}
              />
                  </div>
              
              <div id='logs'>
              <LogSheet log_entries={
                LogEntries
              } />
              

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;