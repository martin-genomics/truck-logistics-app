export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Stop {
  id: string;
  type: 'pickup' | 'dropoff' | 'fuel' | 'rest';
  name: string;
  coordinates: Coordinates;
  duration: number; // in minutes
  arrivalTime?: string;
  departureTime?: string;
}

export interface RouteSegment {
  from: string;
  to: string;
  distance: number; // in miles
  duration: number; // in minutes
  path: Coordinates[];
}

export interface DailySchedule {
  date: string;
  driving: number;
  onDuty: number;
  offDuty: number;
  segments: {
    type: 'driving' | 'onDuty' | 'offDuty' | 'sleeper';
    startTime: string;
    endTime: string;
    duration: number;
  }[];
}

export interface TripData {
  id: string;
  origin: string;
  destination: string;
  totalDistance: number;
  totalDuration: number;
  estimatedDays: number;
  stops: Stop[];
  route: RouteSegment[];
  schedule: DailySchedule[];
  logSheet: {
    days: {
      date: string;
      segments: {
        type: 'driving' | 'onDuty' | 'offDuty' | 'sleeper';
        startHour: number;
        duration: number;
      }[];
    }[];
  };
}

// ===============================
// Log Sheet (ELD-style)
// ===============================
export type DutyStatus =
  | "Off Duty"
  | "Sleeper"
  | "Driving"
  | "On Duty"
  | "Break";



export interface LogSegment {
    startHour: number;
    start: number;   // Hour of the day (0-24, can be float e.g. 14.5)
    end: number;
    status: DutyStatus;
    duration: number;
  }
  