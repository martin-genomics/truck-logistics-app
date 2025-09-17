// components/LogSheet.tsx
import React from 'react';
import type { LogEntry, LogEntryStatus } from '../../types';
import SpotlightCard from '../SpotlightCard';

interface LogSheetProps {
  log_entries: LogEntry[];
}

const LogSheet: React.FC<LogSheetProps> = ({ log_entries }) => {
  // Generate hour markers
  const hourMarkers = Array.from({ length: 24 }, (_, i) => i);

  // Get color for each status
  const getStatusColor = (status: LogEntryStatus): string => {
    const colors: { [key: string]: string } = {
      'Off Duty': 'bg-gray-300/40',
      'Break': 'bg-blue-300/40',
      'Driving': 'bg-green-300/40',
      'On Duty': 'bg-yellow-300/40'
    };
    return colors[status] || 'bg-gray-300';
  };

  // Clear existing bars and draw new ones based on log entries
  const renderStatusBar = (status: LogEntryStatus) => {
    if (!log_entries || log_entries.length === 0) return null;
    
    const entries = log_entries.filter(entry => entry.status === status);
    
    if (entries.length === 0) {
      return (
        <div className="relative my-2 h-8 bg-gray-100/10 rounded">
          <div className="h-full flex items-center justify-center text-xs text-gray-500">
            No {status} time
          </div>
        </div>
      );
    }

    return (
      <div className="relative my-2 h-8 bg-gray-100/10 rounded overflow-hidden">
        {entries.map((entry, index) => {
          const startHour = entry.start_hour;
          const endHour = entry.end_hour > startHour ? entry.end_hour : 24;
          const duration = endHour - startHour;
          
          const widthPercentage = (duration / 24) * 100;
          const leftPercentage = (startHour / 24) * 100;
          
          return (
            <div
              key={index}
              className={`absolute h-full ${getStatusColor(status)}`}
              style={{
                width: `${widthPercentage}%`,
                left: `${leftPercentage}%`
              }}
              title={`${entry.status}: ${formatTime(startHour)}-${formatTime(endHour)}`}
            >
              <div className="h-full flex items-center justify-center text-xs font-medium">
                {duration > 2 && `${duration.toFixed(2)}h`}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Format time for display
  const formatTime = (hour: number): string => {
    const hour12 = hour % 12 || 12;
    const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
    return `${hour12}${ampm}`;
  };

  return (

    <SpotlightCard className="custom-spotlight-card h-full text-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-primary-500" spotlightColor="rgba(0, 229, 255, 0.2)">
      <h2 className="text-xl font-semibold mb-4">ELD Log Sheet - 24 Hour Timeline</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Time markers */}
          <div className="grid grid-cols-24 gap-0 mb-2">
            {hourMarkers.map(hour => (
              <div key={hour} className="text-xs text-center border-r border-gray-200 py-1">
                {formatTime(hour)}
              </div>
            ))}
          </div>
          
          {/* Hour numbers */}
          <div className="grid grid-cols-24 gap-0 mb-4">
            {hourMarkers.map(hour => (
              <div key={hour} className="text-xs text-center border-r border-gray-200 py-1 font-bold">
                {hour}
              </div>
            ))}
          </div>
          
          {/* Status bars */}
          <div className="space-y-4">
            <div>
              <div className="font-medium py-2 flex items-center">
                <div className="w-4 h-4 bg-gray-300/70 rounded mr-2"></div>
                Off Duty
              </div>
              {renderStatusBar('Off Duty')}
            </div>
            
            <div>
              <div className="font-medium py-2 flex items-center">
                <div className="w-4 h-4 bg-blue-300/70 rounded mr-2"></div>
                Break
              </div>
              {renderStatusBar('Break')}
            </div>
            
            <div>
              <div className="font-medium py-2 flex items-center">
                <div className="w-4 h-4 bg-green-300/70 rounded mr-2"></div>
                Driving
              </div>
              {renderStatusBar('Driving')}
            </div>
            
            <div>
              <div className="font-medium py-2 flex items-center">
                <div className="w-4 h-4 bg-yellow-300/70 rounded mr-2"></div>
                On Duty
              </div>
              {renderStatusBar('On Duty')}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-teal-500/20 rounded-lg">
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300/70 rounded mr-2"></div>
                Off Duty - Not working
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-300/70 rounded mr-2"></div>
                Break - Short rest periods
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-300/70 rounded mr-2"></div>
                Driving - Operating vehicle
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-300/70 rounded mr-2"></div>
                On Duty - Working but not driving
              </div>
            </div>
          </div>

          {/* Summary */}
          {log_entries && log_entries.length > 0 && (
            <div className="mt-6 p-4 bg-teal-500/20 text-white/90 rounded-lg">
              <h3 className="font-semibold mb-2">Time Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Driving:</span>{' '}
                  {log_entries
                    .filter(e => e.status === 'Driving')
                    .reduce((total, e) => total + (e.end_hour - e.start_hour), 0)
                    .toFixed(1)}h
                </div>
                <div>
                  <span className="font-medium">On Duty:</span>{' '}
                  {log_entries
                    .filter(e => e.status === 'On Duty')
                    .reduce((total, e) => total + (e.end_hour - e.start_hour), 0)
                    .toFixed(1)}h
                </div>
                <div>
                  <span className="font-medium">Off Duty:</span>{' '}
                  {log_entries
                    .filter(e => e.status === 'Off Duty')
                    .reduce((total, e) => total + (e.end_hour - e.start_hour), 0)
                    .toFixed(1)}h
                </div>
                <div>
                  <span className="font-medium">Break:</span>{' '}
                  {log_entries
                    .filter(e => e.status === 'Break')
                    .reduce((total, e) => total + (e.end_hour - e.start_hour), 0)
                    .toFixed(1)}h
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default LogSheet;