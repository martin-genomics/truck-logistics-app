// components/RouteMap.tsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { RouteMapProps, Stop } from '@/types';

// Set your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const RouteMap: React.FC<RouteMapProps> = ({ routeData, className = 'h-[60vh]' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-98.5795);
  const [lat, setLat] = useState(39.8283);
  const [zoom, setZoom] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [locationNames, setLocationNames] = useState<{[key: string]: string}>({});

  // Get color for different stop types
  const getStopColor = (stopType: string): string => {
    const colors: { [key: string]: string } = {
      pickup: '#4ECDC4',       // Teal
      dropoff: '#FF6B6B',      // Red
      rest: '#FFD93D',         // Yellow
      fuel: '#6B5B95',         // Purple
      default: '#95A5A6'       // Gray
    };
    return colors[stopType] || colors.default;
  };

  // Get emoji for different stop types
  const getStopEmoji = (stopType: string): string => {
    const emojis: { [key: string]: string } = {
      pickup: '📦',
      dropoff: '🏁',
      rest: '🛏️',
      fuel: '⛽',
      default: '📍'
    };
    return emojis[stopType] || emojis.default;
  };

  // Parse coordinate string to numbers
  const parseCoordinates = (coordString: string): [number, number] => {
    const cleaned = coordString.replace(/[()]/g, '');
    const [lng, lat] = cleaned.split(',').map(coord => parseFloat(coord.trim()));
    return [lng, lat];
  };

  // Use Mapbox Geocoding API to reverse geocode coordinates to address
  const reverseGeocode = async (coordinates: [number, number]): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}&types=poi,address,place`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding API request failed');
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        // Try to get the most specific address first
        const addressFeature = data.features.find((f: any) => 
          f.place_type.includes('address') || f.place_type.includes('poi')
        );
        
        if (addressFeature) {
          return addressFeature.place_name;
        }
        
        // Fallback to the first feature
        return data.features[0].place_name;
      }
      
      return 'Unknown location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Location details unavailable';
    }
  };

  // Calculate coordinates along the route based on mile markers
  const calculateStopCoordinates = (start: [number, number], end: [number, number], mileMarker: number, totalMiles: number): [number, number] => {
    if (totalMiles === 0) return start;
    
    const progress = mileMarker / totalMiles;
    const lng = start[0] + (end[0] - start[0]) * progress;
    const lat = start[1] + (end[1] - start[1]) * progress;
    
    return [lng, lat];
  };

  // Get coordinates for all stops with proper placement along the route
  const getStopCoordinates = async (stops: Stop[]): Promise<Array<{ stop: Stop; coordinates: [number, number]; address: string }>> => {
    const coordinates = [];
    
    // Get start and end coordinates
    const startCoords = await geocodeAddress(routeData.pickup_location);
    const endCoords = await geocodeAddress(routeData.dropoff_location);
    
    for (const stop of stops) {
      let coords: [number, number];
      let address = stop.location;
      
      if (stop.stop_type === 'pickup') {
        coords = await geocodeAddress(routeData.pickup_location);
        address = routeData.pickup_location;
      } else if (stop.stop_type === 'dropoff') {
        coords = await geocodeAddress(routeData.dropoff_location);
        address = routeData.dropoff_location;
      } else {
        // For fuel and rest stops, calculate position along the route
        coords = calculateStopCoordinates(
          startCoords, 
          endCoords, 
          stop.mile_marker, 
          routeData.total_distance_miles
        );
        
        // Reverse geocode to get actual address
        const reverseGeocodedAddress = await reverseGeocode(coords);
        address = reverseGeocodedAddress;
        
        // Update location names state
        setLocationNames(prev => ({
          ...prev,
          [stop.location]: reverseGeocodedAddress
        }));
      }
      
      coordinates.push({ stop, coordinates: coords, address });
    }
    
    return coordinates;
  };

  // Geocode address to coordinates using Mapbox API
  const geocodeAddress = async (address: string): Promise<[number, number]> => {
    try {
      // If it's already a coordinate string, parse it
      if (address.includes('(') && address.includes(')')) {
        return parseCoordinates(address);
      }
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding API request failed');
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].center;
      }
      
      throw new Error('No results found');
    } catch (error) {
      console.error('Geocoding error:', error);
      // Fallback coordinates
      if (address.includes('New York') || address.includes('NY')) return [-74.0060, 40.7128];
      if (address.includes('Los Angeles') || address.includes('LA') || address.includes('CA')) return [-118.2437, 34.0522];
      return [-98.5795, 39.8283]; // Default to center of US
    }
  };

  // Calculate bounds for all points
  const calculateBounds = (points: [number, number][]): mapboxgl.LngLatBounds => {
    const bounds = new mapboxgl.LngLatBounds();
    points.forEach(point => bounds.extend(point));
    return bounds;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      setIsLoading(true);

      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('load', async () => {
        try {
          // Get coordinates for all stops
          const stopCoords = await getStopCoordinates(routeData.stops);
          
          // Get current location coordinates
          let currentLocationCoords: [number, number];
          if (routeData.current_location.includes('(') && routeData.current_location.includes(')')) {
            currentLocationCoords = parseCoordinates(routeData.current_location);
          } else {
            currentLocationCoords = await geocodeAddress(routeData.current_location);
          }

          // Prepare all points for bounds calculation
          const allPoints: [number, number][] = [currentLocationCoords];
          stopCoords.forEach(({ coordinates }) => allPoints.push(coordinates));

          // Fit map to bounds
          const bounds = calculateBounds(allPoints);
          map.current!.fitBounds(bounds, { padding: 50 });

          // Add current location marker
          new mapboxgl.Marker({ color: '#FF6B35' })
            .setLngLat(currentLocationCoords)
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-bold">Current Location</h3>
                <p>${routeData.current_location}</p>
              </div>
            `))
            .addTo(map.current!);

          // Add stop markers with different colors for each type
          stopCoords.forEach(({ stop, coordinates, address }) => {
            const color = getStopColor(stop.stop_type);
            const emoji = getStopEmoji(stop.stop_type);
            
            new mapboxgl.Marker({ color })
              .setLngLat(coordinates)
              .setPopup(new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">${emoji} ${stop.stop_type.toUpperCase()}</h3>
                  <p class="text-sm font-medium">${address}</p>
                  <p class="text-xs text-gray-600">Mile: ${stop.mile_marker.toFixed(1)}</p>
                  ${stop.duration_hours > 0 ? `<p class="text-xs text-gray-600">Duration: ${stop.duration_hours.toFixed(1)}h</p>` : ''}
                </div>
              `))
              .addTo(map.current!);
          });

          // Draw route line connecting all points in order
          const routeCoordinates = [currentLocationCoords];
          
          // Add stops in order (they should already be ordered by mile_marker)
          const orderedStops = [...stopCoords].sort((a, b) => a.stop.mile_marker - b.stop.mile_marker);
          orderedStops.forEach(({ coordinates }) => {
            routeCoordinates.push(coordinates);
          });

          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates
              }
            }
          });

          map.current!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3B82F6',
              'line-width': 4,
              'line-opacity': 0.8
            }
          });

        } catch (error) {
          console.error('Error initializing map:', error);
        } finally {
          setIsLoading(false);
        }
      });

      // Update center and zoom when map moves
      map.current.on('move', () => {
        if (map.current) {
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
          setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        }
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [routeData]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 bg-opacity-80 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-white">Loading map and detecting locations...</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg shadow-md max-w-xs">
        <h3 className="font-semibold text-sm mb-2">Route Info</h3>
        <p className="text-xs ">
          Distance: <span className="font-medium">{routeData.total_distance_miles.toFixed(1)} miles</span>
        </p>
        <p className="text-xs ">
          Drive Time: <span className="font-medium">{routeData.total_drive_hours.toFixed(1)} hours</span>
        </p>
        <p className="text-xs ">
          Stops: <span className="font-medium">{routeData.stops.length}</span>
        </p>
        <p className="text-xs ">
          Days: <span className="font-medium">{routeData.estimated_days}</span>
        </p>
      </div>

      <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg shadow-md">
        <h3 className="font-semibold text-sm mb-2">Legend</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
            <span>Current Location</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-[#4ECDC4] rounded-full"></div>
            <span>Pickup</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
            <span>Dropoff</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-[#FFD93D] rounded-full"></div>
            <span>Rest Stop</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-[#6B5B95] rounded-full"></div>
            <span>Fuel Stop</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;