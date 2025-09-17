import apiClient from './axiosConfig';
import type { RouteData, FormData } from '@/types';

// Type for the API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

const tripService = {
  /**
   * Create a new trip plan
   */
  async createTrip(tripData: FormData): Promise<ApiResponse<RouteData>> {
    try {
      const response = await apiClient.post<RouteData>('/trips/', tripData);
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: 'Trip created successfully'
      };
    } catch (error: any) {
      console.error('Error creating trip:', error);
      return {
        data: {} as RouteData,
        status: error.response?.status || 500,
        success: false,
        message: error.response?.data?.message || 'Failed to create trip'
      };
    }
  },

  /**
   * Get trip details by ID
   */
  async getTrip(tripId: string): Promise<ApiResponse<RouteData>> {
    try {
      const response = await apiClient.get<ApiResponse<RouteData>>(`/trips/${tripId}`);
      return response.data; // Return the data property which contains the ApiResponse<RouteData>
    } catch (error: any) {
      console.error(`Error fetching trip ${tripId}:`, error);
      return {
        data: {} as RouteData,
        status: error.response?.status || 500,
        success: false,
        message: error.response?.data?.message || 'Failed to fetch trip'
      };
    }
  },

  /**
   * Update an existing trip
   */
  async updateTrip(tripId: string, tripData: Partial<FormData>): Promise<ApiResponse<RouteData>> {
    try {
      const response = await apiClient.put<ApiResponse<RouteData>>(`/trips/${tripId}`, tripData);
      return response.data; // Return the data property which contains the ApiResponse<RouteData>
    } catch (error: any) {
      console.error(`Error updating trip ${tripId}:`, error);
      return {
        data: {} as RouteData,
        status: error.response?.status || 500,
        success: false,
        message: error.response?.data?.message || 'Failed to update trip'
      };
    }
  },

  /**
   * Delete a trip
   */
  async deleteTrip(tripId: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting trip ${tripId}:`, error);
      throw error;
    }
  },

  /**
   * Get all trips for the current user
   */
  async getUserTrips(): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get<ApiResponse<RouteData[]>>('/trips/');
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: 'Trips fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching user trips:', error);
      throw error;
    }
  },

  /**
   * Get logs for a specific day of a trip
   * @param tripId - The ID of the trip
   * @param dayNumber - The day number (1-based index)
   */
  async getTripDayLogs(tripId: string, dayNumber: number): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get<any>(
        `/trips/${tripId}/days/${dayNumber}/logs/`
      );
      return {
        data: response.data?.log_entries,
        status: response.status,
        success: true,
        message: 'Logs retrieved successfully'
      };
    } catch (error: any) {
      console.error(`Error fetching logs for trip ${tripId}, day ${dayNumber}:`, error);
      return {
        data: [],
        status: error.response?.status || 500,
        success: false,
        message: error.response?.data?.message || 'Failed to fetch trip day logs'
      };
    }
  }
};

export default tripService;
