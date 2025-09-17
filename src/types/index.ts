// types/index.ts
export interface FormData {
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    current_cycle_hours: number;
  }
  
export interface DailySchedule {
  id: number;
  day_number: number;
  driving_hours: number;
  on_duty_hours: number;
  off_duty_hours: number;
  notes?: string;
}

export type LogEntryStatus = 'Off Duty' | 'Break' | 'Driving' | 'On Duty' ;

export interface LogEntry {
    status: LogEntryStatus;
    start_hour: number;
    end_hour: number;
  }
  
  export interface TripData {
    id: string;
    total_distance: number;
    total_drive_hours: number;
    estimated_days: number;
    route: {
      polyline: [number, number][];
      stops: Stop[];
    };
    daily_schedule: DailySchedule[];
    log_entries: LogEntry[];
  }

  export interface Stop {
    id: number;
    stop_type: 'pickup' | 'dropoff' | 'fuel' | 'rest';
    location: string;
    mile_marker: number;
    duration_hours: number;
  }

  export interface RouteMapProps {
    routeData: RouteData;
    className?: string;
  }

  
  export interface RouteData {
    id: string;
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    total_distance_miles: number;
    total_drive_hours: number;
    current_cycle_hours: number;
    estimated_days: number;
    stops: Stop[];
    created_at: string;
    daily_schedules: DailySchedule[];
    log_entries: LogEntry[];
  }
  
 export interface RouteMapProps {
    routeData: RouteData;
    className?: string;
  }