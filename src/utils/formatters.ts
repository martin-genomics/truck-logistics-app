interface DistanceOptions {
  units?: 'metric' | 'imperial';
  decimals?: number;
  withUnit?: boolean;
}

interface DurationOptions {
  format?: 'short' | 'long';
  includeSeconds?: boolean;
}

interface DateFormatOptions {
  includeTime?: boolean;
  includeWeekday?: boolean;
  format?: 'numeric' | 'short' | 'long';
}

/**
 * Format distance with customizable units and precision
 * @param meters - Distance in meters
 * @param options - Formatting options
 * @returns Formatted distance string
 */
export const formatDistance = (
  meters: number, 
  options: DistanceOptions = {}
): string => {
  const {
    units = 'imperial',
    decimals = 1,
    withUnit = true
  } = options;

  let value: number;
  let unit: string;

  if (units === 'metric') {
    value = meters / 1000; // Convert to kilometers
    unit = 'km';
  } else {
    value = meters * 0.000621371; // Convert to miles
    unit = 'mi';
  }

  // Format the number with specified decimal places
  const formattedValue = value.toFixed(decimals);
  
  return withUnit ? `${formattedValue} ${unit}` : formattedValue;
};

/**
 * Format duration in a human-readable way
 * @param minutes - Duration in minutes
 * @param options - Formatting options
 * @returns Formatted duration string
 */
export const formatDuration = (
  minutes: number, 
  options: DurationOptions = {}
): string => {
  const { format = 'short', includeSeconds = false } = options;
  
  const totalSeconds = Math.round(minutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (format === 'long') {
    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (mins > 0 || hours > 0) parts.push(`${mins} minute${mins !== 1 ? 's' : ''}`);
    if (includeSeconds && (secs > 0 || parts.length === 0)) {
      parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
    }
    return parts.join(' ');
  }

  // Short format (e.g., "2h 30m" or "2:30:45")
  if (includeSeconds) {
    return [
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  }
  
  return `${hours}h ${mins.toString().padStart(2, '0')}m`;
};

/**
 * Format a date in a readable format
 * @param date - Date string or Date object
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date, 
  options: DateFormatOptions = {}
): string => {
  const { 
    includeTime = true, 
    includeWeekday = false,
    format = 'short'
  } = options;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'numeric' ? 'numeric' : format,
    day: 'numeric',
  };

  if (includeWeekday) {
    formatOptions.weekday = format === 'long' ? 'long' : 'short';
  }

  if (includeTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }

  return dateObj.toLocaleDateString('en-US', formatOptions);
};

/**
 * Format a time from minutes since midnight
 * @param minutes - Minutes since midnight (0-1440)
 * @param options - Formatting options
 * @returns Formatted time string
 */
export const formatTimeFromMinutes = (
  minutes: number, 
  options: { format?: '12h' | '24h' } = {}
): string => {
  const { format = '12h' } = options;
  
  // Ensure minutes is within a valid range (0-1440)
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440;
  
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = Math.floor(normalizedMinutes % 60);

  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  // 12-hour format with AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Format a number with commas as thousand separators
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (num: number, decimals = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};
